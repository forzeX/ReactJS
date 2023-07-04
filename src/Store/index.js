import {
  configureStore,
  combineReducers,
  applyMiddleware,
  createStore,
  compose,
} from "@reduxjs/toolkit";
import { chatReducer } from "./chats/reducer";
import { ADD_CHAT } from "./chats/actions";
import { messagesReducer } from "./messages/reducer";
import { ADD_MESSAGE } from "./messages/actions";
import { profileReducer } from "./profile/reducer";
import { CHANGE_PROFILE } from "./profile/actions";
// Логгер для отслеживания отправленных action'ов и измененного ими state'а
import logger from "./middleWare/logger";
// Логгер для вычисления времени, затраченного reducer'ами на обработку каждого action'а
import monitorReducerEnhancer from "./enhancers/monitorReducer";
import thunk from "redux-thunk";
import newMessageIndicator from "./middleWare/newMessageIndicator";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const rootReducer = combineReducers({
  chats: chatReducer,
  messages: messagesReducer,
  profile: profileReducer,
});

const middlewareEnhancer = applyMiddleware(logger, thunk, newMessageIndicator);

const persistConfig = {
  key: "Messenger",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  enhancers: [middlewareEnhancer, monitorReducerEnhancer],
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export const store = createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(thunk))
// );
