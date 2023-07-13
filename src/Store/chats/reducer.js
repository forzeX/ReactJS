import { REQUEST_STATUS } from "../../Utils/Constants";
import { ADD_MESSAGE } from "../messages/actions";
import {
  CLEAR_BLINK_LOG,
  DATA_ERROR,
  DATA_REQUEST,
  DATA_SUCCESS,
  DELETE_CHAT,
  SHOW_ADD_CHAT_BAR,
  SUPPLY_BLINK_LOG,
} from "./actions";

const initialState = {
  chatList: [],
  requestStatus: {
    status: REQUEST_STATUS.IDLE,
    error: "",
  },
  showModal: false,
  haveNewMessages: [],
};

const shortenedChatList = (chatList, chatId) => {
  return chatList.filter((chat) => chat.id !== chatId);
};

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_REQUEST: {
      return {
        ...state,
        requestStatus: {
          status: REQUEST_STATUS.PENDING,
          error: "",
        },
      };
    }
    case DATA_SUCCESS: {
      console.log(action.data.chatList);
      return {
        ...state,
        chatList: [...action.data.chatList],
        requestStatus: {
          status: REQUEST_STATUS.SUCCESS,
          error: "",
        },
      };
    }
    case DATA_ERROR: {
      console.log(action.data);
      return {
        ...state,
        requestStatus: {
          status: REQUEST_STATUS.FAILURE,
          error: action.error,
        },
      };
    }
    case SHOW_ADD_CHAT_BAR: {
      return {
        ...state,
        showModal: !state.showModal,
      };
    }
    case SUPPLY_BLINK_LOG: {
      return {
        ...state,
        haveNewMessages: [...state.haveNewMessages, action.payload],
      };
    }
    case CLEAR_BLINK_LOG: {
      return {
        ...state,
        haveNewMessages: [],
      };
    }
    default:
      return state;
  }
};
