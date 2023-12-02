import React, { useState, useContext, useEffect } from "react";
import google_icon from "../../assets/google.png";
import facebook_icon from "../../assets/facebook.png";
import IMDB_icon from "../../assets/IMDB.png";
import "./LoginSignup.css";
import { useNavigate } from "react-router-dom";
import { storage } from "../../services/firebase";
import { doc, setDoc, getFirestore, getDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase'; 
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { UserContext } from "../../services/usercontext";
import { createRequestToken } from "../../services/session";
import authService from "../../services/authService";
console.log(UserContext);

  // Function to initiate TMDB token authorization process
  const handleTMDBAuthorization = async () => {
    try {
      const requestToken = await createRequestToken();
      window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:3000/tmdb-auth`;
      
    } catch (error) {
      console.error("Error creating TMDB request token:", error);
    }
  };

const LoginSignup = () => {
  const [active, setActive] = useState("login");

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
            Sign in
          </h3>
          <h4
            className={active === "signup" ? "active" : ""}
            onClick={() => setActive("signup")}
          >
            Create your IMDb account
          </h4>
        </div>
        <div className="form-section">
          {active === "login" && (
            <Login />
          )}
          {active === "signup" && (
  <Signup setActive={setActive} />
)}
          
        </div>
      </div>
    </div>
  );
};

// LOG IN COMPONENT
const Login = ({ }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { updateUser, user } = useContext(UserContext);

  // NORMAL Log In
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await authService.loginWithEmail(email, password);
      const additionalData = await fetchUserDetails(userCredential.user.uid);
      console.log(userCredential.user);
      updateUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        ...additionalData,
      });
      console.log("user from log in component pov: "+user);
      handleTMDBAuthorization();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const fetchUserDetails = async (uid) => {
    const db = getFirestore();
    const docRef = doc(db, "Users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  };

  // GOOGLE Log IN
  const handleGoogleLogin = async () => {
    try {
      const googleUser = await authService.signInWithGoogle();
      const db = getFirestore();
      const userRef = doc(db, "Users", googleUser.uid);
  
      // Check if user already exists in Firestore
      const docSnap = await getDoc(userRef);
  
      if (docSnap.exists()) {
        // User exists, update the data without changing 'MemberSince'
        await setDoc(userRef, {
          username: googleUser.displayName || "",
          email: googleUser.email,
          photoURL: googleUser.photoURL
          // other fields if needed
        }, { merge: true });
      } else {
        // User doesn't exist, create new record with 'MemberSince'
        await setDoc(userRef, {
          username: googleUser.displayName || "",
          email: googleUser.email,
          photoURL: googleUser.photoURL,
          MemberSince: new Date()
          // other fields if needed
        }, { merge: true });
      }
  
      updateUser({
        uid: googleUser.uid,
        email: googleUser.email,
        username: googleUser.displayName || ""
      });
  
      console.log("Google sign-in successful, user:", googleUser);
      handleTMDBAuthorization();
    } catch (error) {
      console.error("Error during Google sign-in", error);
    }
  };
  
  // FACEBOOK Log In
  const handleFacebookLogin = async () => {
    try {
        const facebookUser = await authService.signInWithFacebook();
        const username = facebookUser.displayName || "";
        const db = getFirestore();
        const userRef = doc(db, "Users", facebookUser.uid);
        await setDoc(
            userRef,
            {
                name: username,
                email: facebookUser.email,
                MemberSince: new Date(),
            },
            { merge: true }
        );

        updateUser({
            uid: facebookUser.uid,
            email: facebookUser.email,
            name: username
        });

        console.log("Facebook sign-in successful, user:", facebookUser);
        handleTMDBAuthorization();
    } catch (error) {
        console.error("Error during Facebook sign-in", error);
    }
};


  return (
    <div>
      <form onSubmit={handleLoginSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="aux-options">
          <label className="remember-me">
            <input type="checkbox" name="remember" /> Keep me signed in.
          </label>
          <div className="forgot-password">
            <button
              onClick={() => navigate("/forgot")}
              className="forgotPasswordButton"
            >
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
        <button className="social-button" onClick={handleFacebookLogin}>
          <img src={facebook_icon} alt="Facebook" />
          Facebook
        </button>
      </div>
    </div>
  );
};

// SIGN UP COMPONENT

const Signup = ({ setActive }) => {
  const navigate = useNavigate();
  const db = getFirestore();
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    username: "",
    gender: "",
    dateOfBirth: "",
    memberSince: new Date().toISOString().split("T")[0], // Default to current date
    country: "",
    password: "",
    confirmPassword: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const { updateUser } = useContext(UserContext);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  useEffect(() => {
    return () => {
      if (selectedFile) {
        URL.revokeObjectURL(selectedFile.preview);
      }
    };
  }, [selectedFile]);

  const renderPhoto = () => {
    if (!selectedFile) {
      return null;
    }
    const photoURL = URL.createObjectURL(selectedFile);
    return (
      <img
        src={photoURL}
        alt="Selected"
        style={{ width: "100px", height: "100px" }}
      />
    );
  };

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
      // Create the user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, signupForm.email, signupForm.password);
      let photoURL = "";
      
      // Handle the photo upload if a file is selected
      if(selectedFile){
        const photoPath=`users/${userCredential.user.uid}/${selectedFile.name}`;
        const photoStorageRef=storageRef(storage,photoPath);
        const snapshot=await uploadBytes(photoStorageRef,selectedFile);
        photoURL=await getDownloadURL(snapshot.ref);
      }

      // Prepare the user data to be saved
      const userData = {
        name: signupForm.name,
        email: signupForm.email,
        //MemberSince: signupForm.MemberSince,
        username: signupForm.username,
        gender: signupForm.gender,
        dateOfBirth: signupForm.dateOfBirth,
        country: signupForm.country,
        photoURL: photoURL,
      };

      // Save the user data to Firestore
      const userRef= doc(db, 'Users', userCredential.user.uid); 
      await setDoc(userRef, userData, { merge: true });

      // Update the user context or global state if necessary
      updateUser(userData);

      // Provide feedback and navigate
      alert('Account created successfully');
      navigate('/login');
    } catch (error) {
      console.log(error.code, error.message);
      alert("Account creation failed");
    }
};

  return (
    <div>
      <form onSubmit={handleSignupSubmit} className="signup-form">
        
        <label htmlFor="name"> </label>
        <input type="text" id="name" name="name" placeholder="Enter your full name"value={signupForm.name} onChange={handleInputChange} required />
        <label htmlFor="username"></label>
        <input type="text" id="username" name="username"placeholder="Enter your username" value={signupForm.username} onChange={handleInputChange} required />
        <label htmlFor="gender"></label>
        <input type="text" id="gender" name="gender" placeholder="gender"value={signupForm.gender} onChange={handleInputChange} required />
        <label htmlFor='dateOfBirth'>date of birth</label>
        <input type='date' id='dateOfBirth' name='dateOfBirth'placeholder="Enter your date of birth" value={signupForm.dateOfBirth} onChange={handleInputChange} required />
        <input type='file' id='photo' accept="image/*" onChange={handleFileChange}  />
        {renderPhoto()}
        <label htmlFor='country'></label>
        <input type='text' id='country' name='country' placeholder="Enter your country" value={signupForm.country} onChange={handleInputChange} required />
        <label htmlFor="signupEmail"></label>
        <input type="email" id="signupEmail" name="email"placeholder="Enter your email" value={signupForm.email} onChange={handleInputChange} required />
        <label htmlFor="signupPassword"></label>
        <input type="password" id="signupPassword" name="password" placeholder="Enter your password"value={signupForm.password} onChange={handleInputChange} required />
        <label htmlFor="confirmPassword"></label>
        <input type="password" id="confirmPassword" name="confirmPassword"  placeholder= " Re-enter you password "value={signupForm.confirmPassword} onChange={handleInputChange} required />
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
