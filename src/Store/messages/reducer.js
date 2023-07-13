import {
  ADD_MESSAGE,
  DATA_ERROR,
  DATA_REQUEST,
  DATA_SUCCESS,
  DELETE_MESSAGE,
} from "./actions";
import { AUTHORS, REQUEST_STATUS } from "../../Utils/Constants";

const initialState = {
  messagesList: {},
  requestStatus: {
    status: REQUEST_STATUS.IDLE,
    error: "",
  },
};

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_REQUEST:
      return {
        ...state,
        requestStatus: {
          status: REQUEST_STATUS.PENDING,
          error: "",
        },
      };
    case DATA_ERROR:
      return {
        ...state,
        requestStatus: {
          status: REQUEST_STATUS.FAILURE,
          error: action.error,
        },
      };
    case DATA_SUCCESS:
      return {
        ...state,
        messagesList: { ...action.data },
        requestStatus: {
          status: REQUEST_STATUS.SUCCESS,
          error: "",
        },
      };
    // case ADD_MESSAGE:
    //   return {
    //     ...state,
    //     messagesList: {
    //       ...state.messagesList,
    //       [action.payload.chatId]: [
    //         ...state.messagesList[action.payload.chatId],
    //         action.payload.message,
    //       ],
    //     },
    //   };
    // case DELETE_CHAT:
    //   const messagesList = { ...state.messagesList };
    //   delete messagesList[action.payload];
    //   return {
    //     messagesList,
    //   };
    // case ADD_CHAT:
    //   return {
    //     ...state,
    //     messagesList: {
    //       ...state.messagesList,
    //       [action.payload.id]: [],
    //     },
    //   };
    // case DELETE_MESSAGE:
    //   return {
    //     ...state,
    //     messagesList: {
    //       ...state.messagesList,
    //       [action.payload.chatId]: [
    //         ...state.messagesList[action.payload.chatId].filter(
    //           (message) => message.id !== action.payload.messageId
    //         ),
    //       ],
    //     },
    //   };
    default:
      return state;
  }
};
