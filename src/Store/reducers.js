import { ADD_CHAT } from "./actions";
import { AUTHORS } from "../Utils/Constants";

const initialState = {
  1: {
    title: "Чат 1",
    storage: [
      { author: AUTHORS.HUMAN, text: "Привет" },
      { author: AUTHORS.HUMAN, text: "Как дела?" },
    ],
  },
  2: {
    title: "Чат 2",
    storage: [
      { author: AUTHORS.HUMAN, text: "Привет" },
      { author: AUTHORS.HUMAN, text: "Как дела?" },
    ],
  },
  3: {
    title: "Чат 3",
    storage: [
      { author: AUTHORS.HUMAN, text: "Привет" },
      { author: AUTHORS.HUMAN, text: "Как дела?" },
    ],
  },
  4: {
    title: "Чат 4",
    storage: [
      { author: AUTHORS.HUMAN, text: "Привет" },
      { author: AUTHORS.HUMAN, text: "Как дела?" },
    ],
  },
  5: {
    title: "Чат 5",
    storage: [
      { author: AUTHORS.HUMAN, text: "Привет" },
      { author: AUTHORS.HUMAN, text: "Как дела?" },
    ],
  },
};

const ADD_MESSAGE = "MESSAGES::ADD_MESSAGE";

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE: {
      return {
        ...state,
        [action.chatID]: {
          ...state[action.chatID],
          storage: [
            ...state[action.chatID].storage,
            {
              // messageId: action.messageId,
              text: action.text,
              author: action.author,
              chatID: action.chatID,
            },
          ],
        },
      };
    }
    case ADD_CHAT: {
      const chatID = Object.keys(state).length + 1;
      const title = `Чат ${chatID}`;
      return { ...state, [chatID]: { title, storage: [] } };
    }
    default:
      return state;
  }
};
