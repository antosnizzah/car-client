import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCreatePaymentMutation } from '../apiservices/payments';
import { RootState } from '../store/usersAPI.reducer';
import { useSelector } from 'react-redux';
import { CreatePaymentRequest } from '../apiservices/payments';
import { CreditCard,CreditCardIcon, AlertCircle, Loader } from 'lucide-react';

interface PaymentFormProps {
  amount: number;
  bookingId: number;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ amount }) => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [error, setError] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.auth.user);

  const [createPayment, { isLoading }] = useCreatePaymentMutation();

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!user) {
      setError('User is not logged in.');
      return;
    }

    if (isNaN(Number(bookingId))) {
      setError('Invalid booking ID.');
      return;
    }

    const paymentData: CreatePaymentRequest = {
      user_id: Number(user.id),
      booking_id: Number(bookingId),
      payment_amount: amount,
      amount: amount, // Ensure this
      payment_method: paymentMethod,
    };

    console.log('Payment Data:', paymentData); // Log the payload

    try {
      const response = await createPayment(paymentData).unwrap();
      alert(`Payment created successfully: ${response.client_secret}`);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <form onSubmit={handlePayment} className="space-y-4 p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
      {error && (
        <div className="flex items-center text-red-500">
          <AlertCircle className="mr-2" />
          {error}
        </div>
      )}
      <div>
        <label className="block text-sm font-bold mb-2" htmlFor="paymentMethod">
          Payment Method
        </label>
        <div className="relative">
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md pl-10"
          >
            <option value="card">Card</option>
            <option value="paypal">PayPal</option>
          </select>
          {paymentMethod === 'card' && <CreditCard className="absolute top-2 left-2 text-gray-500" />}
          {paymentMethod === 'paypal' && <CreditCardIcon className="absolute top-2 left-2 text-gray-500" />}
        </div>
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
        disabled={isLoading}
      >
        {isLoading ? <Loader className="animate-spin mr-2" /> : 'Pay Now'}
      </button>
    </form>
  );
};

export default PaymentForm;
