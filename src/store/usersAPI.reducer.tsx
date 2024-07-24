// store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { bookingApi } from '../apiservices/bookingApi';
import { vehiclesApi } from '../apiservices/vehicles';
import { usersApi } from '../apiservices/users';
import { authApi } from '../apiservices/authApi';
import authReducer from '../apiservices/authSlice';
import bookingReducer from '../slices/bookingSlice';
import notificationReducer from '../action';
import { fleetApi } from '../apiservices/fleetmanagement';
import { carApi } from '../apiservices/car';
import { paymentsApi } from '../apiservices/payments';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const rootReducer = combineReducers({
  [bookingApi.reducerPath]: bookingApi.reducer,
  [vehiclesApi.reducerPath]: vehiclesApi.reducer,
  [fleetApi.reducerPath]: fleetApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [paymentsApi.reducerPath]: paymentsApi.reducer,
  [carApi.reducerPath]: carApi.reducer,
  auth: authReducer,
  booking: bookingReducer,
  notifications: notificationReducer,
  [authApi.reducerPath]: authApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'notifications'], // Persist auth and notifications reducers
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(usersApi.middleware)
      .concat(vehiclesApi.middleware)
      .concat(fleetApi.middleware)
      .concat(paymentsApi.middleware)
      .concat(bookingApi.middleware)
      .concat(authApi.middleware)
      .concat(carApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
