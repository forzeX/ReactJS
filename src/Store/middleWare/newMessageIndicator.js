import { SUPPLY_BLINK_LOG, clearBlinkLog } from "../chats/actions";
// import { ADD_MESSAGE } from "../messages/actions";

const newMessageIndicator = (store) => (next) => (action) => {
  if (action.type === SUPPLY_BLINK_LOG) {
    let timeout;
    timeout = setTimeout(() => {
      store.dispatch(clearBlinkLog());
    }, 3000);
  }
  return next(action);
};

export default newMessageIndicator;
