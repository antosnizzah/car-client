import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Notification {
  name: string;
  email: string;
  message: string;
}

export interface NotificationsState {
  notifications: Notification[];
}

export const initialState: NotificationsState = {
  notifications: [],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<Notification>) {
      state.notifications.push(action.payload);
    },
    deleteNotification(state, action: PayloadAction<number>) {
      state.notifications.splice(action.payload, 1);
    },
  },
});

export const { addNotification, deleteNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
