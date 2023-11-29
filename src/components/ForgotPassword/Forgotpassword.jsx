import React from 'react';
import './Forgotpassword.css'; // Make sure the path is correct

export function Forgot() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission
  };

  return (
    <div className="auth-container">
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <h3>Forgot Password</h3>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" placeholder="Enter your email" />
        </div>
        <button type="submit" className="btn btn-primary btn-block">Reset Password</button>
      </form>
    </div>
  );
}