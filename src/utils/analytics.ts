import { Identify, identify } from "@amplitude/analytics-browser";
import * as amplitude from "@amplitude/analytics-browser";

type User = {
  idx?: number;
  uid?: string;
  register_type?: string;
  user_email?: string;
  user_status?: "pending" | "verifying" | "confirmed";
  delete_flag?: boolean;
  [key: string]: unknown;
};

const AMPLITUDE_APP_KEY = process.env.REACT_APP_AMPLITUDE_KEY;
let isStarted = false;

export const setUserInfo = (userInfo: User | undefined) => {
  const event = new Identify();

  if (userInfo) {
    const userInfoArr = Object.entries(userInfo);
    userInfoArr.forEach((info: [string, any]) => event.set(info[0], info[1]));
  }

  identify(event);
};

const startAmplitude = (userInfo: User | undefined) => {
  if (AMPLITUDE_APP_KEY) {
    if (userInfo?.user_email) {
      amplitude.init(AMPLITUDE_APP_KEY, userInfo.user_email);
    } else {
      amplitude.init(AMPLITUDE_APP_KEY);
    }
  }
};

export const startAll = (userInfo?: User) => {
  // 이미 시작되어있으면 중단
  if (isStarted) {
    return;
  }

  isStarted = true;

  if (userInfo) setUserInfo(userInfo);

  startAmplitude(userInfo);
};

export const setUserIdAfterLogin = (userId: string) => {
  amplitude.setUserId(userId);
};

export type AmplitudeEvent = {
  name: string;
  props?: object | any;
};

export const handleCustomAnalyticsEvent = (ev: AmplitudeEvent) => {
  try {
    sendAmplitudeEvent(ev);
  } catch (error) {
    // 이쪽에서 난 오류로 인해 메인 비즈니스 로직이 멈추지 않도록 오류를 catch 한다
  }
};

const sendAmplitudeEvent = (ev: AmplitudeEvent) => {
  if (ev.props) {
    amplitude.track(ev.name, ev.props);
  } else {
    amplitude.track(ev.name);
  }
};

// 주어진 target의 data attribute 중 data-event-name에서 event 이름을, data-event-prop에서 property들을 읽어온다
const getEventFromElement = (target: HTMLElement) => {
  let eventPropertyKeys = Object.keys(target.dataset).filter((d) => /^eventProp/.test(d));
  let eventProperties: any = {};
  eventPropertyKeys.forEach((key) => {
    let propertyName = key
      .replace("eventProp", "")
      .replace(/\.?([A-Z]+)/g, function (x, y) {
        return "_" + y.toLowerCase();
      })
      .replace(/^_/, "");
    eventProperties[propertyName] = target.dataset[key];
  });

  const event: AmplitudeEvent = {
    name: target.dataset.eventName as string,
    props: eventProperties,
  };

  return event;
};

export const handleClickEvent = (ev: WindowEventMap["click"]) => {
  let path: EventTarget[] = ev.composedPath();

  // event path를 하나씩 확인하며 data-event-name property가 존재할 경우 멈춤
  for (let target of path) {
    try {
      let targetElement: HTMLElement = target as HTMLElement;
      // 채널톡의 경우 data attribute를 수동으로 추가해준다
      if (targetElement.id === "ch-plugin") {
        targetElement.dataset.eventName = "ChannelTalk";
      }

      if (targetElement.dataset.eventName != null) {
        // select 태그일 경우 무시하고 handleChangeEvent에서 처리하게 함
        if (targetElement.tagName.toLowerCase() !== "select") {
          // interaction 방식을 데이터에 추가
          targetElement.dataset["eventPropInteraction"] = "click";
          let event = getEventFromElement(targetElement);
          sendAmplitudeEvent(event);
        }
        break;
      }
    } catch (e) {
      if (target === window) {
        break;
      }
    }
  }
};
