import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { Toaster } from 'react-hot-toast';
import { AuthContextProvider } from './utills/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <App />
      <Toaster />  {/* Toaster is now inside the AuthContextProvider */}
    </AuthContextProvider>
  </StrictMode>,
);
