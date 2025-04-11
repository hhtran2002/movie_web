import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import GoogleOAuthProvider
import './index.css';
import App from './App.tsx';

const clientId = 'YOUR_GOOGLE_CLIENT_ID'; // Replace with your Google Client ID from Google Cloud Console

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);