import { clearNewMessagesLog } from "../chats/actions";
import { ADD_MESSAGE } from "../messages/actions";

const newMessageIndicator = (store) => (next) => (action) => {
  if (action.type === ADD_MESSAGE) {
    let timeout;
    timeout = setTimeout(() => {
      store.dispatch(clearNewMessagesLog());
    }, 3000);
  }
  return next(action);
};

export default newMessageIndicator;
