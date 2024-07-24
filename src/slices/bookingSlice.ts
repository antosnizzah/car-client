import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Car {
  _id: string;
  name: string;
  desc: string;
  price: number;
  bookingQuantity: number;
}

export interface BookingState {
  bookedCars: Car[];
  totalAmount: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: BookingState = {
  bookedCars: [],
  totalAmount: 0,
  isLoading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBookings(state, action: PayloadAction<Car[]>) {
      state.bookedCars = action.payload;
    },
    getTotals(state) {
      let total = 0;
      state.bookedCars.forEach((car) => {
        total += car.price * car.bookingQuantity;
      });
      state.totalAmount = total;
    },
  },
});

export const { setBookings, getTotals } = bookingSlice.actions;
export default bookingSlice.reducer;
