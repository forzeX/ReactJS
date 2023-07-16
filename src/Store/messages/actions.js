import { API_URL, AUTHORS } from "../../Utils/Constants";
import { supplyBlinkLog } from "../chats/actions";

export const ADD_MESSAGE = "MESSAGES::ADD_MESSAGE";
export const DELETE_MESSAGE = "MESSAGES::DELETE_MESSAGE";
export const DATA_REQUEST = "MESSAGES::DATA_REQUEST";
export const DATA_SUCCESS = "MESSAGES::DATA_SUCCESS";
export const DATA_ERROR = "MESSAGES::DATA_ERROR";

export const messagesDataRequest = () => ({
  type: DATA_REQUEST,
});

export const messagesDataSuccess = (data) => {
  return {
    type: DATA_SUCCESS,
    data,
  };
};
export const messagesDataError = (error) => ({
  type: DATA_ERROR,
  error,
});

// export const addMessage = (newMessage, chatId) => ({
//   type: ADD_MESSAGE,
//   payload: {
//     message: newMessage,
//     chatId,
//   },
// });

// export const addMessageWithThunk =
//   (newMessage, chatId) => (dispatch, getState) => {
//     dispatch(addMessage(newMessage, chatId));
//     if (newMessage.author !== AUTHORS.BOT) {
//       let timeout;
//       timeout = setTimeout(() => {
//         dispatch(
//           addMessage(
//             {
//               author: AUTHORS.BOT,
//               text: "Не приставай ко мне. Я - робот!",
//               id: Date.now().toString(),
//             },
//             chatId
//           )
//         );
//       }, 500);
//     }
//   };

// export const deleteMessage = (chatId, messageId) => ({
//   type: DELETE_MESSAGE,
//   payload: { chatId, messageId },
// });

export const getMessages = (dispatch) => {
  dispatch(messagesDataRequest());
  fetch(API_URL.MESSAGES, {
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
      dispatch(messagesDataSuccess(data));
    })
    .catch((error) => {
      dispatch(messagesDataError(error.message));
      console.log(error);
    });
};

export const addMessage = (newMessage, chatId) => (dispatch, getState) => {
  dispatch(messagesDataRequest());
  fetch(`${API_URL.MESSAGES}_add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chatId: chatId,
      message: newMessage,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch(messagesDataSuccess(data));
      dispatch(supplyBlinkLog(chatId));
    })
    .then((result) => {
      console.log("Начало отправления на сервер ответа бота");
      let timeout;
      timeout = setTimeout(() => {
        dispatch(messagesDataRequest());
        fetch(`${API_URL.MESSAGES}_add`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chatId: chatId,
            message: {
              author: AUTHORS.BOT,
              text: "Не приставай ко мне. Я - робот!",
              id: Date.now().toString(),
            },
          }),
        })
          .then((response) => {
            console.log(response);
            return response.json();
          })
          .then((data) => {
            dispatch(messagesDataSuccess(data));
            dispatch(supplyBlinkLog(chatId));
          });
      }, 1000);
    })
    .catch((error) => dispatch(messagesDataError(error.message)));
};

export const deleteMessage = (chatId, messageId) => (dispatch, getState) => {
  dispatch(messagesDataRequest());
  fetch(`${API_URL.MESSAGES}_delete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chatId: chatId,
      messageId: messageId,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch(messagesDataSuccess(data));
    })
    .catch((error) => dispatch(messagesDataError(error.message)));
};
