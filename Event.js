export class Event {
  constructor(eventType, callback) {
    if (Object.values(EventTypes).includes(eventType))

    this._eventType = eventType;
    this._callback = callback;
  }

  getEventType = () => {
    return this._eventType;
  }

  trigger = () => {
    return this._callback;
  }
}

export const EventTypes = {
  OTHER: 0,
  MOUSE_MOVE: 1,
  MOUSE_CLICK: 2,
}
