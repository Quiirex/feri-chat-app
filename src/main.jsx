import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import './samples/node-api';
import './index.scss';
import { AuthContextProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthContextProvider>
);

postMessage({ payload: 'removeLoading' }, '*');
