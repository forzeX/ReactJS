export const ADD_CHAT = "CHATS::ADD_CHAT";
export const SHOW_ADD_CHAT_BAR = "CHATS::SHOW_ADD_CHAT_BAR";
export const CLEAR_NEW_MESSAGES_LOG = "CHATS:CLEAR_NEW_MESSAGES_LOG";
export const DELETE_CHAT = "CHATS:DELETE_CHAT";

export const addChat = (newChat) => ({
  type: ADD_CHAT,
  payload: newChat,
});

export const showAddChatBar = () => ({
  type: SHOW_ADD_CHAT_BAR,
});

export const clearNewMessagesLog = () => ({
  type: CLEAR_NEW_MESSAGES_LOG,
});

export const deleteChat = (chatId) => ({
  type: DELETE_CHAT,
  payload: chatId,
});
