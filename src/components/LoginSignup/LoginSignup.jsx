import React, { useState } from "react";
import { SignUp, Login } from "../../firebase"; // Ensure you're exporting Login from firebase.js
import google_icon from "../Assets/google.png";
import facebook_icon from "../Assets/facebook.png";
import IMDB_icon from "../Assets/IMDB.png";
import "./LoginSignup.css";
import { Link } from "react-router-dom";
import { handleGoogleLogin, handleFacebookLogin } from "../../firebase";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const [active, setActive] = useState("login");
  const [formKey, setFormKey] = useState(0); // Reset the form key on successful signup
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupForm({ ...signupForm, [name]: value });
  };
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (signupForm.password !== signupForm.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    try {
      const user = await SignUp(signupForm.email, signupForm.password);
      alert("Signup successful!");
      navigate(`/profile/${user.uid}`); // Redirect to user profile
      // Rest of your code
    } catch (error) {
      alert(error.message);
    }
  };
  const handleGoogleClick = () => {
    handleGoogleLogin();
  };
  const handleFacebookClick = () => {
    handleFacebookLogin();
  };

  // Add the new handleLoginSubmit function here
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    try {
      const user = await Login(email, password);
      alert("Login successful!");
      navigate(`/profile/${user.uid}`); // Redirect to user profile
      // Rest of your code
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="top-icon">
        <img src={IMDB_icon} alt="IMDB" />
      </div>
      <div className="auth-card">
        <div className="card-head">
          <h3
            className={active === "login" ? "active" : ""}
            onClick={() => setActive("login")}
          >
            Sign in{" "}
          </h3>
        </div>
        <div className="form-section">
          {active === "login" && (
            <>
              <form onSubmit={handleLoginSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required />
                <div className="aux-options">
                  <label className="remember-me">
                    <input type="checkbox" name="remember" /> Keep me signed in.
                  </label>
                  <div className="forgot-password">
                    <button
                      onClick={() => navigate("/forgotpassword")}
                      className="forgotPasswordButton"
                    >
                      Forgot Your Password?
                    </button>
                  </div>
                </div>
                <button type="submit">Sign in</button>
              </form>
              <div className="social-login">
                <p className="social-login-intro">Or login with:</p>
                <button className="social-button" onClick={handleGoogleClick}>
                  <img src={google_icon} alt="Google" />
                  Google
                </button>
                <button className="social-button" onClick={handleFacebookClick}>
                  <img src={facebook_icon} alt="Facebook" />
                  Facebook
                </button>
                <h4
                  className={active === "signup" ? "active" : ""}
                  onClick={() => setActive("signup")}
                >
                  Create your IMDb account
                </h4>
              </div>
            </>
          )}

          {active === "signup" && (
            <>
              <form onSubmit={handleSignupSubmit} key={formKey}>
                <label htmlFor="name">First and Last Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="First and Last Name"
                  name="name"
                  value={signupForm.name}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="signupEmail">Email</label>
                <input
                  type="email"
                  id="signupEmail"
                  name="email"
                  value={signupForm.email}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="signupPassword">Password</label>
                <input
                  type="password"
                  id="signupPassword"
                  placeholder="at least 8 characters"
                  name="password"
                  value={signupForm.password}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="confirmPassword">Re-enter password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={signupForm.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
                <button type="submit">Create your IMDB account</button>
              </form>{" "}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
