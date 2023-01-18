import { App } from "./App.js";
import { Hardware, HardwareTypes } from "./Hardware.js";
import { Event, EventTypes } from "./Event.js";
import { RenderManager } from "./RenderManager.js";

export class OS {
  constructor() {
    // Private variables
    this._apps = [];
    // Currently no hot-plug support for hardware
    this._hardware = []; // List of hardware devices (i.e. canvas, homebutton, ...)
    this._events = []; // Currently only hardware-events (=mouse click, homebutton press, ...)

    for (let i=0; i<arguments.length; i++) {
      let obj = arguments[i];
      if (obj instanceof App) this._apps.push(obj);
      else if (obj instanceof Hardware) this._hardware.push(obj);
      else if (obj instanceof Event) this._events.push(obj);
    }

    // Public variables
    for (let i=0; i<this._hardware.length; i++) {
      if (this._hardware[i].hwType === HardwareTypes.DISPLAY && this._hardware[i].isVirtual()) { // Only single display supported
        this.renderManager = new RenderManager(this.render, this._hardware[i]);
        break;
      }
    }
  }

  registerApp = (app) => {
    if (!(event instanceof App)) return false;

    this._apps.push(app);

    return true;
  }

  registerEvent = (event) => {
    if (!(event instanceof Event)) return false;

    this._events.push(event);

    return true;
  }
  // onEvent (i.e. mouse click) {for event in events {if event.type == EventTypes.MOUSE_CLICK}}❤️❤️❤️

  _triggerEvent = (triggeredEvent, parameters) => {
    if (triggeredEvent === undefined) return false;
    if (!(triggeredEvent instanceof Event)) return false;
    if (parameters === undefined) parameters = [];

    for (let i=0; i<this._events.length; i++) {
      let event = this._events[i];
      if (!(event.getEventType() === triggeredEvent.getEventType())) continue;
      event.trigger(parameters);
    }

    return true;
  }

  _getDisplay = (canBeVirtual) => { // maybe return array of displays if multi-display support is available
    for (let i=0; i<this._hardware.length; i++) {
      if (this._hardware[i].hwType === HardwareTypes.DISPLAY && (!this._hardware[i].isVirtual() || canBeVirtual)) { // Only single display supported
        return this._hardware[i];
      }
    }
    return null;
  }

  render = (cache) => {
    if (!(cache instanceof Hardware)) return false;

    let display = this._getDisplay(false);
    let displayContext = (display === null) ? null : display.getContext("2d");

    if (display === null || displayContext === null) return false;

    // Access private variable because OS is allowed to (display._hwObject)
    displayContext.clearRect(0, 0, display._hwObject.width, display._hwObject.height);
    displayContext.drawImage(cache._hwObject, 0, 0);
    //console.warn("Loaded cache into view");

    return true;
  }

  // Testing begins here
  launchApp = (app) => {
    if (!(app instanceof App)) return false;
    if (!(app in this._apps)) console.warn("[OS] Launching unregistered app!");

    let display = this._getDisplay();

    let appEvents = app._getEvents(); // how to interact with events? draw something in goodnotes
    let appRenderer = app._launch();
    let finalRenderer = () => {appRenderer(this.renderManager, display._hwObject.width, display._hwObject.height); this.renderManager._draw();}

    setInterval(() => {
      finalRenderer();
    }, 16); // Render every 16ms => 1000ms/16msPerFrame=60FPS
  }
}
