import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import './Forgotpassword.css'; // Make sure the path is correct

export function Forgot() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        setMessage('Check your email to reset your password.');
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage); // Update the state with the error message
      });
  };

  return (
    <div className="auth-container">
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <h3>Forgot Password</h3>
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">Reset Password</button>
      </form>
    </div>
  );
}
