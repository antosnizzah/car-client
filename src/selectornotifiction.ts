import { createSelector } from 'reselect';
import { RootState } from './store/usersAPI.reducer';

const selectNotificationsState = (state: RootState) => state.notifications;

export const selectNotifications = createSelector(
  [selectNotificationsState],
  (notificationsState) => notificationsState.notifications || []
);
