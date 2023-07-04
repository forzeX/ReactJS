import { ADD_MESSAGE } from "../messages/actions";
import {
  ADD_CHAT,
  CLEAR_NEW_MESSAGES_LOG,
  DELETE_CHAT,
  SHOW_ADD_CHAT_BAR,
} from "./actions";

const initialState = {
  chatList: [
    { name: "Чат 1", id: "9efd8d44-18a2-11ee-be56-0242ac120002" },
    { name: "Чат 2", id: "9efd9082-18a2-11ee-be56-0242ac120002" },
    { name: "Чат 3", id: "9efd9208-18a2-11ee-be56-0242ac120002" },
    { name: "Чат 4", id: "9efd9370-18a2-11ee-be56-0242ac120002" },
    { name: "Чат 5", id: "9efd9c12-18a2-11ee-be56-0242ac120002" },
  ],
  showModal: false,
  haveNewMessages: [],
};

const shortenedChatList = (chatList, chatId) => {
  return chatList.filter((chat) => chat.id !== chatId);
};

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHAT: {
      return {
        ...state,
        chatList: [...state.chatList, action.payload],
      };
    }
    case SHOW_ADD_CHAT_BAR: {
      return {
        ...state,
        showModal: !state.showModal,
      };
    }
    case ADD_MESSAGE: {
      return {
        ...state,
        haveNewMessages: [...state.haveNewMessages, action.payload.chatId],
      };
    }
    case CLEAR_NEW_MESSAGES_LOG: {
      return {
        ...state,
        haveNewMessages: [],
      };
    }
    case DELETE_CHAT: {
      return {
        ...state,
        chatList: [...shortenedChatList(state.chatList, action.payload)],
      };
    }
    default:
      return state;
  }
};
