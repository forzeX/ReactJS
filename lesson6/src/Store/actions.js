export const ADD_MESSAGE = "MESSAGES::ADD_MESSAGE";
export const ADD_CHAT = "CHATS::ADD_CHAT";
export const CHANGE_NAME = "PROFILE::CHANGE_NAME";
export const SHOW_ADD_CHAT_BAR = "CHATS:SHOW_ADD_CHAT_BAR";

export const addMessage = (text, author, chatID) => ({
  type: ADD_MESSAGE,
  text,
  author,
  chatID,
});

export const showAddChatBar = () => ({
  type: SHOW_ADD_CHAT_BAR,
});

export const addChat = (value) => ({
  type: ADD_CHAT,
  title: value,
});

export const sendProfileName = (text) => ({
  type: CHANGE_NAME,
  profileName: text,
});
