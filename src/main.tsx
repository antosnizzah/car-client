import React from 'react'
import ReactDOM from 'react-dom/client'
import { store } from './store/usersAPI.reducer';
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import CohereChat from '../src/components/open.tsx'; 



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <CohereChat /> 

    </Provider>
  </React.StrictMode>
);
