import { initializeApp } from "firebase/app";
import { 
  getFirestore , collection,getDocs
 } from "firebase/firestore";

import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import {getStorage} from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDU1eLTPx4o3-CC-wkXULYSdDfjy8ZX0kI",
  authDomain: "project-1b9a4.firebaseapp.com",
  projectId: "project-1b9a4",
  storageBucket: "project-1b9a4.appspot.com",
  messagingSenderId: "432468155616",
  appId: "1:432468155616:web:e59b1aceb5d144bab74485",
  measurementId: "G-2HSW7XE7E8"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(); 

const colRef = collection(db, "users");
getDocs(colRef).then((snapshot) => {
    console.log(snapshot.docs);
  });

const auth = getAuth(app); 
const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, db,storage, googleProvider, facebookProvider };