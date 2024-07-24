import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PaLuZ2K8zMBWfUDLIwCgMqh9JWfF0QrzrDsDSzo7C26Y36DkO1wMzBjzkdPbiAS6GWW9EYvZWtI0NTC3NZS9dX800KrCraB2x');

interface StripeProviderProps {
    children: React.ReactNode;
  }


const StripeProvider: React.FC<React.PropsWithChildren<StripeProviderProps>> = ({ children }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeProvider;
