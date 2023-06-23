export const ADD_MESSAGE = "MESSAGES::ADD_MESSAGE";
export const ADD_CHAT = "CHATS::ADD_CHAT";

// export const addMessage = (messageId, text, author, chatID) => ({
export const addMessage = (text, author, chatID) => ({
  type: ADD_MESSAGE,
  // messageId,
  text,
  author,
  chatID,
});

export const addChat = () => ({
  type: ADD_CHAT,
});
