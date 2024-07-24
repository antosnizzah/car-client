import React from 'react'
import ReactDOM from 'react-dom/client'
import { store } from './store/usersAPI.reducer';
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import StripeProvider from '../src/stripeProvider.tsx';
import CohereChat from '../src/components/open.tsx'; 
import { PersistGate } from 'redux-persist/integration/react';
import {  persistor } from '../src/store/usersAPI.reducer.tsx';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <StripeProvider>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      </PersistGate>
      <CohereChat />
    </StripeProvider>

    </Provider>
  </React.StrictMode>
);
