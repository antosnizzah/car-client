import { configureStore } from '@reduxjs/toolkit';
import { bookingApi } from '../apiservices/bookingApi';
import { vehiclesApi } from '../apiservices/vehicles';
import { usersApi } from '../apiservices/users';
import { authApi } from '../apiservices/authApi';
import authReducer from '../apiservices/authSlice';
import bookingReducer from '../slices/bookingSlice';
import { carApi } from '../apiservices/car';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    [bookingApi.reducerPath]: bookingApi.reducer,
    [vehiclesApi.reducerPath]: vehiclesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [carApi.reducerPath]: carApi.reducer,
    auth: authReducer,
    booking: bookingReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(vehiclesApi.middleware)
      .concat(bookingApi.middleware)
      .concat(authApi.middleware)
      .concat(carApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create custom hooks for dispatch and selector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
