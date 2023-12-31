import React, { useState, useContext, useEffect } from "react";
import google_icon from "../../assets/google.png";
import facebook_icon from "../../assets/facebook.png";
import IMDB_icon from "../../assets/IMDB.png";
import "./LoginSignup.css";
import { useNavigate } from "react-router-dom";
import { auth, storage } from "../../services/firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getFirestore, getDoc } from "firebase/firestore";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { UserContext } from "../../services/usercontext";
import {redirectToTMDBForToken} from "../../services/session"


const LoginSignup = () => {
  const [active, setActive] = useState("login");
  return (
    <div className="auth-container-loginsignup">
      <div className="top-icon">
        <img src={IMDB_icon} alt="IMDB" />
      </div>
      <div className="auth-card">
        <div className="card-head">
          <h3
            className={active === "login" ? "active" : ""}
            onClick={() => setActive("login")}
          >
            Sign In
          </h3>
          <h4
            className={active === "signup" ? "active" : ""}
            onClick={() => setActive("signup")}
          >
            <strong>Sign Up</strong>
          </h4>
        </div>
        <div className="form-section">
          {active === "login" && <Login setActive={setActive} />}
          {active === "signup" && <Signup setActive={setActive} />}
        </div>
      </div>
    </div>
  );
};
const Login = ({ setActive }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage] = useState("");
  const { setUser } = useContext(UserContext);
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const additionalData = await fetchUserDetails(userCredential.user.uid);
      console.log(additionalData);
      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,

        ...additionalData,
      });
      console.log(userCredential.user);

      redirectToTMDBForToken(); //redirect for token approval here

      // navigate('/home');
    } catch (error) {
      console.log(error.code, error.message);
      if (error.code === "auth/wrong-password") {
        window.alert("Wrong password. Please try again.");
      } else {
        window.alert(error.message);
      }
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
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });

    try {
      const result = await signInWithPopup(auth, provider);
      const googleUser = result.user;
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

      console.log("Google sign-in successful, user:", googleUser);
      redirectToTMDBForToken(); //redirect for token approval here
      // navigate("/home");
    } catch (error) {
      console.error("Error during Google sign-in", error);
    }
  };

  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const facebookUser = result.user;
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
      console.log("Facebook sign-in successful, user:", facebookUser);
      redirectToTMDBForToken(); //redirect for token approval here
      // navigate("/home");
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
const Signup = ({ setActive }) => {
  const navigate = useNavigate();
  const db = getFirestore();
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    username: "",
    Gender: "",
    dateOfBirth: "",
    MemberSince: "",
    country: "",
    password: "",
    confirmPassword: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
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
        URL.revokeObjectURL(selectedFile);
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
      alert("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
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
          MemberSince: new Date().toISOString(),
          username: signupForm.username,
          gender: signupForm.Gender,
          dateOfBirth: signupForm.dateOfBirth,
          country: signupForm.country,
          photoURL: photoURL,
        },
        { merge: true }
      );

      console.log("Account created successfully");
      navigate("/");
      setActive("login");
    } catch (error) {
      console.error(error.code, error.message);
      alert("Account creation failed: " + error.message);
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
