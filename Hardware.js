export class Hardware {
  constructor(hwType, hwObject, virtual) {
    // check if hwType has a value from HardwareTypes
    if (Object.values(HardwareTypes).includes(hwType))
    if (virtual === undefined) virtual = false;
    else if (!(virtual === true || virtual === false)) virtual = false;

    this.hwType = hwType;
    this._hwObject = hwObject;
    this._virtual = virtual;
  }

  getContext = () => {
    if (this.hwType !== HardwareTypes.DISPLAY) return false; // maybe return {failed: true/false, content: whatever}
    return this._hwObject.getContext("2d");
  }

  isVirtual = () => {
    return this._virtual;
  }
}

export const HardwareTypes = {
  OTHER: 0,
  DISPLAY: 1,
  BUTTON: 2,
  IMAGE: 3,
}
