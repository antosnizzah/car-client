import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/usersAPI.reducer';
import PaymentForm from '../components/paymentform';
import { useGetPaymentByBookingQuery } from '../apiservices/payments';

const BookingPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const user = useSelector((state: RootState) => state.auth.user);
  const { data: payment, error } = useGetPaymentByBookingQuery(Number(bookingId));

  if (!user) {
    return <div>Please log in to make a payment.</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Booking Payment</h1>
      {error ? (
        <div className="text-red-500">Failed to load payment details</div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-4">
          {payment && (
            <div>
              <div className="mb-2">
                <strong>Payment Status:</strong> {payment.payment_status}
              </div>
              <div className="mb-2">
                <strong>Amount:</strong> ${payment.payment_amount}
              </div>
            </div>
          )}
          <PaymentForm bookingId={Number(bookingId)} amount={Number(payment?.payment_amount || 0)} />
        </div>
      )}
    </div>
  );
};

export default BookingPage;
