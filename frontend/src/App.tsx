// frontend/src/App.tsx
import React from 'react';
import './App.css';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import ForgotPassword from './pages/Forgot-password';
// import ResetPassword from './pages/Reset-password';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <div className="App">
      {/* <Login /> */}
      {/* <Register/> */}
      {/* <ForgotPassword/> */}
      {/* <ResetPassword/> */}
      <Home/>
    </div>
  );
};

export default App;