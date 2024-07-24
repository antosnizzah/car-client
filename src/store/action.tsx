// store.ts
import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from '../action';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, notificationReducer);

export const store2 = configureStore({
  reducer: {
    notifications: persistedReducer,
  },
});

export const persistor = persistStore(store2);
export default store2;
export type RootState = ReturnType<typeof store2.getState>;
