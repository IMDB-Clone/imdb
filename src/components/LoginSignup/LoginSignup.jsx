import React, { useState, useContext, useEffect } from "react";
import google_icon from "../../assets/google.png";
import facebook_icon from "../../assets/facebook.png";
import IMDB_icon from "../../assets/IMDB.png";
import "./LoginSignup.css";
import { useNavigate } from "react-router-dom";
import { storage } from "../../services/firebase";
import { doc, setDoc, getFirestore, getDoc } from "firebase/firestore";
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
            <Signup />
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
        const username = googleUser.displayName || "";
        const db = getFirestore();
        const userRef = doc(db, "Users", googleUser.uid);

        await setDoc(
            userRef,
            {
                username: username,
                email: googleUser.email,
                MemberSince: new Date(),
            },
            { merge: true }
        );

        updateUser({
            uid: googleUser.uid,
            email: googleUser.email,
            username: username
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
              onClick={() => navigate("/forgotpassword")}
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
  const [ setErrorMessage] = useState(""); 
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
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const userCredential = await authService.signUpWithEmail(
        signupForm.email,
        signupForm.password
      );
      let photoURL = "";
      if (selectedFile) {
        const photoPath = `users/${userCredential.user.uid}/${selectedFile.name}`;
        const photoStorageRef = storageRef(storage, photoPath);
        const snapshot = await uploadBytes(photoStorageRef, selectedFile);
        photoURL = await getDownloadURL(snapshot.ref);
      }

      const userRef = doc(db, "Users", userCredential.user.uid);
      await setDoc(
        userRef,
        {
          name: signupForm.name,
          email: signupForm.email,
          memberSince: new Date(),
          username: signupForm.username,
          gender: signupForm.gender,
          dateOfBirth: signupForm.dateOfBirth,
          country: signupForm.country,
          photoURL: photoURL,
        },
        { merge: true }
      );

      updateUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        ...signupForm,
        photoURL: photoURL,
      });

      navigate("/");
    } catch (error) {
      setErrorMessage(error.message); // Displaying the error message
    }
  };
  return (
    <div>
      <form onSubmit={handleSignupSubmit} className="signup-form">
        <label htmlFor="name">Full Name </label>
        <input
          type="text"
          id="name"
          name="name"
          value={signupForm.name}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={signupForm.username}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="Gender">Gender</label>
        <input
          type="text"
          id="Gender"
          name="Gender"
          value={signupForm.Gender}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="dateOfBirth">Date of Birth</label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={signupForm.dateOfBirth}
          onChange={handleInputChange}
          required
        />
        {/* <label htmlFor="MemberSince">Member Since</label>
        <input
          type="date"
          id="MemberSince"
          name="MemberSince"
          value={signupForm.MemberSince}
          onChange={handleInputChange}
          required
        /> */}
        <label htmlFor="photo">Upload Photo</label>
        <input
          type="file"
          id="photo"
          accept="image/*"
          onChange={handleFileChange}
        />
        {renderPhoto()}
        <label htmlFor="country">Country</label>
        <input
          type="text"
          id="country"
          name="country"
          value={signupForm.country}
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
        <button
          type="button"
          onClick={() => setActive("login")}
          className="back-to-login-button"
        >
          Back to Login
        </button>
      </form>
    </div>
  );
};

export default LoginSignup;
