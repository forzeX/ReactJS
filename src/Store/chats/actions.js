import { API_URL } from "../../Utils/Constants";
import {
  getMessages,
  messagesDataError,
  messagesDataRequest,
} from "../messages/actions";

export const DATA_REQUEST = "CHATS::DATA_REQUEST";
export const DATA_SUCCESS = "CHATS::DATA_SUCCESS";
export const DATA_ERROR = "CHATS::DATA_ERROR";
export const SHOW_ADD_CHAT_BAR = "CHATS::SHOW_ADD_CHAT_BAR";
export const SUPPLY_BLINK_LOG = "CHATS::SUPPLY_BLINK_LOG";
export const CLEAR_BLINK_LOG = "CHATS::CLEAR_BLINK_LOG";
export const TOGGLE_VISIBILITY = "CHATS::TOGGLE_VISIBILITY";

export const chatsDataRequest = () => ({
  type: DATA_REQUEST,
});

export const chatsDataSuccess = (data) => {
  return {
    type: DATA_SUCCESS,
    data,
  };
};
export const chatsDataError = (error) => ({
  type: DATA_ERROR,
  error,
});

export const getChatsData = (dispatch) => {
  dispatch(chatsDataRequest());
  fetch(API_URL.CHATS, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        // Свойство "ok" полученного объекта response становится true, если HTTP-статус находится в диапазоне 200-299
        throw new Error(`Ошибка ` + response.status);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      dispatch(chatsDataSuccess(data));
    })
    .catch((error) => {
      dispatch(chatsDataError(error.message));
      console.log(error);
    });
};

export const addChat = (newChat) => (dispatch, getState) => {
  dispatch(chatsDataRequest);
  fetch(`${API_URL.CHATS}_add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: newChat.name,
      id: newChat.id,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка` + response.status);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      dispatch(chatsDataSuccess(data));
    })
    .catch((error) => {
      console.log(error);
      dispatch(chatsDataError());
    });

  dispatch(getMessages);
};

export const deleteChat = (id) => (dispatch, getState) => {
  dispatch(chatsDataRequest);
  fetch(`${API_URL.CHATS}_delete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка` + response.status);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      dispatch(chatsDataSuccess(data));
    })
    .catch((error) => {
      console.log(error);
      dispatch(chatsDataError());
    });
};

export const showAddChatBar = () => ({
  type: SHOW_ADD_CHAT_BAR,
});

export const supplyBlinkLog = (chatId) => ({
  type: SUPPLY_BLINK_LOG,
  payload: chatId,
});

export const clearBlinkLog = () => ({
  type: CLEAR_BLINK_LOG,
});

export const toggleVisibility = () => ({
  type: TOGGLE_VISIBILITY,
});
