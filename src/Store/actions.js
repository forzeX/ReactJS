export const ADD_MESSAGE = "MESSAGES::ADD_MESSAGE";
export const ADD_CHAT = "CHATS::ADD_CHAT";
export const CHANGE_NAME = "PROFILE::CHANGE_NAME";

export const addMessage = (text, author, chatID) => ({
  type: ADD_MESSAGE,
  text,
  author,
  chatID,
});

export const addChat = () => ({
  type: ADD_CHAT,
});

export const sendProfileName = (text) => ({
  type: CHANGE_NAME,
  profileName: text,
});
