import React, { useState } from 'react';
// Import these directly from firebase/auth if they are not custom functions
// Ensure these are correctly imported from your Firebase setup
import google_icon from '../Assets/google.png';
import facebook_icon from '../Assets/facebook.png';
import IMDB_icon from '../Assets/IMDB.png';
import './LoginSignup.css';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signInWithPopup, GoogleAuthProvider,FacebookAuthProvider } from 'firebase/auth';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';


const LoginSignup = () => {
  const [active, setActive] = useState('login'); // State to manage active tab

  return (
    <div className="auth-container">
      <div className="top-icon">
        <img src={IMDB_icon} alt="IMDB" />
      </div>
      <div className="auth-card">
        <div className="card-head">
          <h3 className={active === 'login' ? "active" : ""} onClick={() => setActive('login')}>Sign in</h3>
          <h4 className={active === 'signup' ? "active" : ""} onClick={() => setActive('signup')}>Create your IMDb account</h4>
        </div>
        <div className="form-section">
          {active === 'login' && <Login setActive={setActive} />}
          {active === 'signup' && <Signup setActive={setActive} />}
        </div>
      </div>
    </div>
  );
};
const Login = ({ setActive }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential.user);
      navigate('/home');
    } catch (error) {
      console.log(error.code, error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Google sign-in successful, user:', result.user);
      navigate('/home'); // Redirect to home page upon successful login
    } catch (error) {
      console.error('Error during Google sign-in', error);
    }
  };
  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    // Attempt to sign in with a popup, which will use the currently logged-in Facebook account
    // or prompt the user to log in if they are not.
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Facebook sign-in successful, user:', result.user);
      navigate('/home'); // Redirect to home page upon successful login
    } catch (error) {
      console.error('Error during Facebook sign-in', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleLoginSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required onChange={e => setEmail(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required onChange={e => setPassword(e.target.value)} />
        <div className="aux-options">
          <label className="remember-me">
            <input type="checkbox" name="remember" /> Keep me signed in.
          </label>
          <div className="forgot-password">
            <button onClick={() => navigate('/forgotpassword')} className="forgotPasswordButton">
              Forgot Your Password?
            </button>
          </div>
        </div>
        <button type="submit">Sign in</button>
      </form>
      <div className="social-login">
        <p className="social-login-intro">Or login with:</p>
        <button className="social-button" onClick={handleGoogleLogin}>
          <img src={google_icon} alt="Google" />
          Google
        </button>
        <button className="social-button"onClick={handleFacebookLogin}  >
          <img src={facebook_icon} alt="Facebook" />
          Facebook
        </button>
      </div>
    </div>
  );
};

const Signup = ({ setActive }) => {
  const navigate = useNavigate();
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSignupForm({ ...signupForm, [name]: value });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (signupForm.password !== signupForm.confirmPassword) {
      console.log('Passwords do not match');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, signupForm.email, signupForm.password);
      console.log(userCredential.user);
      navigate('/login');
    } catch (error) {
      console.log(error.code, error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSignupSubmit}>
        <label htmlFor="name">First and Last Name</label>
        <input type="text" id="name" name="name" value={signupForm.name} onChange={handleInputChange} required />
        <label htmlFor="signupEmail">Email</label>
        <input type="email" id="signupEmail" name="email" value={signupForm.email} onChange={handleInputChange} required />
        <label htmlFor="signupPassword">Password</label>
        <input type="password" id="signupPassword" name="password" value={signupForm.password} onChange={handleInputChange} required />
        <label htmlFor="confirmPassword">Re-enter password</label>
        <input type="password" id="confirmPassword" name="confirmPassword" value={signupForm.confirmPassword} onChange={handleInputChange} required />
        <button type="submit">Create your IMDB account</button>
      </form>
    </div>
  );
};

export default LoginSignup;
