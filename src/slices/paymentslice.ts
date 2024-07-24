import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Payment {
  bookingId: number;
  status: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  payments: Payment[]; // Add payments property to User
}

interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
    updatePaymentStatus: (state, action: PayloadAction<{ bookingId: number; status: string }>) => {
      if (state.user) {
        const { bookingId, status } = action.payload;

        // Find the payment entry that matches the bookingId
        const payment = state.user.payments.find(p => p.bookingId === bookingId);

        if (payment) {
          // Update the payment status if found
          payment.status = status;
        } else {
          // Add new payment entry with default status 'pending' if it doesn't exist
          state.user.payments.push({
            bookingId,
            status: status || 'pending', // Default to 'pending' if status is not provided
          });
        }
      }
    },
  },
});

export const { setCredentials, logOut, updatePaymentStatus } = authSlice.actions;
export default authSlice.reducer;
