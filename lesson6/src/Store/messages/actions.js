import { AUTHORS } from "../../Utils/Constants";

export const ADD_MESSAGE = "MESSAGES::ADD_MESSAGE";
export const DELETE_MESSAGE = "MESSAGES::DELETE_MESSAGE";

export const addMessage = (newMessage, chatId) => ({
  type: ADD_MESSAGE,
  payload: {
    message: newMessage,
    chatId,
  },
});

// Используем thunk
export const addMessageWithThunk =
  (newMessage, chatId) => (dispatch, getState) => {
    dispatch(addMessage(newMessage, chatId));
    if (newMessage.author !== AUTHORS.BOT) {
      let timeout;
      timeout = setTimeout(() => {
        dispatch(
          addMessage(
            {
              author: AUTHORS.BOT,
              text: "Не приставай ко мне. Я - робот!",
              id: Date.now().toString(),
            },
            chatId
          )
        );
      }, 500);
    }
  };

export const deleteMessage = (chatId, messageId) => ({
  type: DELETE_MESSAGE,
  payload: { chatId, messageId },
});
