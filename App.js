export class App {
  constructor(name, renderingMethod, events) {
    if (events === undefined) events = [];

    this._name = name;
    this._renderingMethod = renderingMethod;
    this._events = [];

    for (let i=0; i<events.length; i++) {
      let event = events[i];
      if (!(event instanceof Event)) continue;
      this._events.push(event);
    }
  }

  _getEvents = () => {
    return this._events;
  }

  _launch = (initiator) => {
    // maybe do some stuff with the initiator idk yet
    return this._renderingMethod;
  }
}
