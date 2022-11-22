import * as amplitude from "@amplitude/analytics-browser";

export type AmplitudeEvent = {
  name: string;
  props?: object | any;
};

class AmplitudeLoader {
  _userId: string;
  _userInfo: object;

  constructor() {
    this._userId = "";
    this._userInfo = {};
  }

  get userId() {
    return this._userId;
  }

  get userInfo() {
    return this._userInfo;
  }

  initialize(amplitudeKey: string, userId?: string, options?: amplitude.Types.BrowserOptions) {
    amplitude.init(amplitudeKey, userId, options);
    if (userId) this._userId = userId;
  }

  setUserId(userId: string) {
    amplitude.setUserId(userId);
    this._userId = userId;
  }

  setUserInfo(key: string, info: string) {
    const userInfo = new amplitude.Identify();
    userInfo.set(key, info);
    amplitude.identify(userInfo);

    this._userInfo = { ...this.userInfo, key: info };
  }

  sendEvent(eventName: string, eventProps?: object) {
    if (eventProps) {
      amplitude.track(eventName, eventProps);
    } else {
      amplitude.track(eventName);
    }
  }

  reset() {
    amplitude.reset();
  }
}

export default new AmplitudeLoader();
