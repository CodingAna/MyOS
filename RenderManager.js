import { OS } from "./OS.js";
import { Hardware, HardwareTypes } from "./Hardware.js";

export class RenderManager {
  constructor(osRender, hwCache) {
    //if (osRender instanceof OS) { // its just the os.render() method
      this._osRender = osRender;
    //}
    if (hwCache instanceof Hardware && hwCache.hwType === HardwareTypes.DISPLAY && hwCache.isVirtual()) { // Only virtual displays are cache-worthy
      this._hwCache = hwCache;
      this._context = this._hwCache.getContext();
    }
  }

  rect = (x, y, width, height, color, drawStyle) => {
    if (color === undefined) color = "#FFFFFF";
    if (drawStyle === undefined) drawStyle = "fill";

    this._context.beginPath();

    if (drawStyle === "fill") {
      this._context.fillStyle = color;
      this._context.fillRect(x, y, width, height);
    } else if (drawStyle === "stroke") {
      this._context.strokeStyle = color;
      this._context.strokeRect(x, y, width, height);
    }
  }

  roundRect = (x, y, width, height, radius, color, drawStyle) => {
    if (color === undefined) color = "#FFFFFF";
    if (drawStyle === undefined) drawStyle = "fill";

    this._context.beginPath();
    this._context.roundRect(x, y, width, height, radius);

    if (drawStyle === "fill") {
      this._context.fillStyle = color;
      this._context.fill();
    } else if (drawStyle === "stroke") {
      this._context.strokeStyle = color;
      this._context.stroke();
    }
  }

  arc = (x, y, radius, startAngle, endAngle, color, drawStyle) => {
    if (color === undefined) color = "#FFFFFF";
    if (drawStyle === undefined) drawStyle = "fill";

    this._context.beginPath();
    this._context.arc(x, y, radius, startAngle, endAngle);

    if (drawStyle === "fill") {
      this._context.fillStyle = color;
      this._context.fill();
    } else if (drawStyle === "stroke") {
      this._context.strokeStyle = color;
      this._context.stroke();
    }
  }

  line = (x, y, toX, toY, color) => {
    if (color === undefined) color = "#FFFFFF";

    this._context.beginPath();
    this._context.strokeStyle = color;
    this._context.moveTo(x, y);
    this._context.lineTo(toX, toY);
    this._context.stroke();
  }

  text = (x, y, text, fontStyle, fontSize, color, drawStyle) => {
    if (fontStyle === undefined) fontStyle = "Arial";
    if (fontSize === undefined) fontSize = "18pt";
    if (color === undefined) color = "#FFFFFF";
    if (drawStyle === undefined) drawStyle = "fill";

    this._context.beginPath();
    this._context.font = fontSize + " " + fontStyle;

    if (drawStyle === "fill") {
      this._context.fillStyle = color;
      this._context.fillText(text, x, y);
    } else if (drawStyle === "stroke") {
      // stroke on a text?? try this
      this._context.strokeStyle = color;
      this._context.strokeText(text, x, y);
    }
  }

  _draw = () => {
    this._osRender(this._hwCache);
  }
}
