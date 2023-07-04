import { ADD_CHAT, DELETE_CHAT } from "../chats/actions";
import { ADD_MESSAGE, DELETE_MESSAGE } from "./actions";
import { AUTHORS } from "../../Utils/Constants";

const initialState = {
  messagesList: {
    "9efd8d44-18a2-11ee-be56-0242ac120002": [
      { author: AUTHORS.HUMAN, text: "Привет", id: "1688452416989" },
      { author: AUTHORS.HUMAN, text: "Как дела?", id: "1688452416990" },
    ],
    "9efd9082-18a2-11ee-be56-0242ac120002": [
      { author: AUTHORS.HUMAN, text: "Привет", id: "1688452416991" },
      { author: AUTHORS.HUMAN, text: "Как дела?", id: "1688452416992" },
    ],
    "9efd9208-18a2-11ee-be56-0242ac120002": [
      { author: AUTHORS.HUMAN, text: "Привет", id: "1688452416993" },
      { author: AUTHORS.HUMAN, text: "Как дела?", id: "1688452416994" },
    ],
    "9efd9370-18a2-11ee-be56-0242ac120002": [
      { author: AUTHORS.HUMAN, text: "Привет", id: "1688452416995" },
      { author: AUTHORS.HUMAN, text: "Как дела?", id: "1688452416996" },
    ],
    "9efd9c12-18a2-11ee-be56-0242ac120002": [
      { author: AUTHORS.HUMAN, text: "Привет", id: "1688452416997" },
      { author: AUTHORS.HUMAN, text: "Как дела?", id: "1688452416998" },
    ],
  },
};

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        ...state,
        messagesList: {
          ...state.messagesList,
          [action.payload.chatId]: [
            ...state.messagesList[action.payload.chatId],
            action.payload.message,
          ],
        },
      };
    case DELETE_CHAT:
      const messagesList = { ...state.messagesList };
      delete messagesList[action.payload];
      return {
        messagesList,
      };
    case ADD_CHAT:
      return {
        ...state,
        messagesList: {
          ...state.messagesList,
          [action.payload.id]: [],
        },
      };
    case DELETE_MESSAGE:
      return {
        ...state,
        messagesList: {
          ...state.messagesList,
          [action.payload.chatId]: [
            ...state.messagesList[action.payload.chatId].filter(
              (message) => message.id !== action.payload.messageId
            ),
          ],
        },
      };
    default:
      return state;
  }
};
