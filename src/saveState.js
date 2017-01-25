import _ from "lodash";

import { COOKIE_LAST_STATE, COOKIE_OMIT_FROM_STATE } from "./constants/AppConstants";

// store the cookie here in case we're testing
let lastCookie = "";

function cookiesToMap (cookieStr) {
  if (!cookieStr || cookieStr.length === 0) {
    return {};
  }
  return _.chain(cookieStr.split(/;\s*/))
          .map((keyValStr) => keyValStr.split(/=/))
          .fromPairs()
          .value();
}

export function getLastState() {
  let cookie = lastCookie;
  if (typeof document !== 'undefined') {
    cookie = document.cookie;
  }
  const stateEncoded = cookiesToMap(cookie)[COOKIE_LAST_STATE];
  if (stateEncoded) {
    const stateJson = decodeURIComponent(stateEncoded);
    return JSON.parse(stateJson);
  } else {
    return {};
  }
}

export function saveState(state) {
  const stateToSave = _.omit(state, COOKIE_OMIT_FROM_STATE);
  const stateJson = JSON.stringify(stateToSave);
  const stateEncoded = encodeURIComponent(stateJson);
  const stateCookie = COOKIE_LAST_STATE + "=" + stateEncoded;
  lastCookie = stateCookie;
  if (typeof document !== 'undefined') {
    document.cookie = lastCookie;
  }
}

export function clearSavedTestState() {
  lastCookie = "";
}
