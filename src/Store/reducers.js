import { ADD_CHAT, CHANGE_NAME, ADD_MESSAGE } from "./actions";
import { AUTHORS } from "../Utils/Constants";

const initialState = {
  profileData: {
    login: "User1",
    name: "Артем",
    lastName: "Горбачев",
    phone: "+7123456789",
    birthDate: "23.12.1990",
  },
  chatsStorage: {
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
  },
};

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE: {
      console.log(state.chatsStorage);
      return {
        ...state,
        chatsStorage: {
          ...state.chatsStorage,
          [action.chatID]: {
            ...state.chatsStorage[action.chatID],
            storage: [
              ...state.chatsStorage[action.chatID].storage,
              {
                // messageId: action.messageId,
                text: action.text,
                author: action.author,
              },
              // Добавляем автоматический ответ бота
              {
                text: "Не приставай ко мне. Я - робот!",
                author: AUTHORS.BOT,
              },
            ],
          },
        },
      };
    }
    case ADD_CHAT: {
      const chatID = Object.keys(state.chatsStorage).length + 1;
      const title = `Чат ${chatID}`;
      return {
        ...state,
        chatsStorage: {
          ...state.chatsStorage,
          [chatID]: { title, storage: [] },
        },
      };
    }
    case CHANGE_NAME: {
      return {
        ...state,
        profileData: { ...state.profileData, name: action.profileName },
      };
    }
    default:
      return state;
  }
};
