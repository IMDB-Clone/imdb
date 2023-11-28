import React, { useState, useContext } from 'react';
import google_icon from '../Assets/google.png';
import facebook_icon from '../Assets/facebook.png';
import IMDB_icon from '../Assets/IMDB.png';
import './LoginSignup.css';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signInWithPopup, GoogleAuthProvider,FacebookAuthProvider } from 'firebase/auth';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getFirestore , getDoc } from 'firebase/firestore';
import { UserContext } from '../../usercontext';

const LoginSignup = () => {
  const [active, setActive] = useState('login'); 
  const {setUser}=useContext(UserContext);
  const navigate = useNavigate();
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
  const [errorMessage] = useState(''); 
  const db = getFirestore();
  const { setUser } = useContext(UserContext);

   

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try { 
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const additionalData = await fetchUserDetails(userCredential.user.uid);
      console.log(additionalData);
      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      
        ...additionalData
      })
      
      
      console.log(userCredential.user);
      navigate('/profile');
    } catch (error) {
      console.log(error.code, error.message);
      if (error.code === 'auth/wrong-password') {
        window.alert('Wrong password. Please try again.'); 
      } else {
        window.alert('Wrong password. Please try again.'); 
      }
    }
  };
  const fetchUserDetails = async (uid) => {
    const db = getFirestore();
    const docRef = doc(db, 'Users', uid); // Assuming 'users' is your collection
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data(); // Returns the user details
    } else {
        console.log('No such document!');
        return null; // Handle the case where user details don't exist
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
      navigate('/home'); 
    } catch (error) {
      console.error('Error during Google sign-in', error);
    }
  };
  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Facebook sign-in successful, user:', result.user);
      navigate('/home'); 
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
            {errorMessage && <p className="error-message">{errorMessage}</p>}
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
  const db=getFirestore();
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    username: '',
    Gender: '',
    dateOfBirth: '',
    country: '',
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
      const userRef= doc(db, 'Users', userCredential.user.uid); 
      await setDoc(userRef,{
        name: signupForm.name,
        email: signupForm.email,
        username: signupForm.username,
        gender:signupForm.Gender,
        dateOfBirth:signupForm.dateOfBirth,
        country:signupForm.country,
      },{merge:true});
      alert('Account created successfully');
      navigate('/home');
    } catch (error) {
      console.log(error.code, error.message);
      alert("Account creation failed")
    }
  };
  return (
    <div>
      <form onSubmit={handleSignupSubmit} className="signup-form">
        
        <label htmlFor="name">Full Name </label>
        <input type="text" id="name" name="name" value={signupForm.name} onChange={handleInputChange} required />
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" value={signupForm.username} onChange={handleInputChange} required />
        <label htmlFor="Gender">Gender</label>
        <input type="text" id="Gender" name="Gender" value={signupForm.Gender} onChange={handleInputChange} required />
        <label htmlFor='dateOfBirth'>Date of Birth</label>
        <input type='date' id='dateOfBirth' name='dateOfBirth' value={signupForm.dateOfBirth} onChange={handleInputChange} required />
        <label htmlFor='country'>Country</label>
        <input type='text' id='country' name='country' value={signupForm.country} onChange={handleInputChange} required />
        <label htmlFor="signupEmail">Email</label>
        <input type="email" id="signupEmail" name="email" value={signupForm.email} onChange={handleInputChange} required />
        <label htmlFor="signupPassword">Password</label>
        <input type="password" id="signupPassword" name="password" value={signupForm.password} onChange={handleInputChange} required />
        <label htmlFor="confirmPassword">Re-enter password</label>
        <input type="password" id="confirmPassword" name="confirmPassword" value={signupForm.confirmPassword} onChange={handleInputChange} required />
        <button type="submit">Create your IMDB account</button>
        <button 
          type="button" 
          onClick={() => setActive('login')} 
          className="back-to-login-button"
        >
          Back to Login
        </button>
      </form>
    </div>
  );
};
export default LoginSignup;