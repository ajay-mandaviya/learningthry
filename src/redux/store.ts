import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  Storage,
  persistCombineReducers,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { MMKV } from 'react-native-mmkv'
import { authReducer } from "./auth.slice";

export const storage = new MMKV()


const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value)
    return Promise.resolve();
  },
  getItem: (key) => {
    const value = storage.getString(key)
    return Promise.resolve(value ?? null);
  },
  removeItem: (key) => {
    storage.delete(key)
    return Promise.resolve();
  },
};

const persistConfig = {
  key: "thryl",
  storage: reduxStorage,
  whitelist: ["auth"],
};

const rootReducer = persistCombineReducers(persistConfig, {
  auth: authReducer,
  
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export type ApplicationStateType = ReturnType<typeof store.getState>;
export type ApplicationDispatch = typeof store.dispatch;
export const persistor = persistStore(store); // Persistor for the store
export default store;
