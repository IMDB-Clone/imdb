import React, { useState, useEffect, useContext } from "react";
import "./UserProfile.css";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { UserContext } from "../../services/usercontext";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [profile, setProfile] = useState({
    username: "",
    name: "",
    gender: "",
    dateOfBirth: "",
    country: "",
    MemberSince: "",
    ratings: [],
    topPicks: [],
    reviews: [],
    email: "",
    photoURL: null,
  });

  useEffect(() => {
    if (user && user.uid) {
      const fetchData = async () => {
        const db = getFirestore();
        const docRef = doc(db, "users", user.uid);
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setProfile((prevProfile) => ({
              ...prevProfile,
              ...userData,
            }));
          } else {
            console.log("Document not found");
          }
        } catch (error) {
          console.error("Error getting user document:", error);
        }
      };
      fetchData();
    }
  }, [user.uid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storage = getStorage();
    const uid = user.uid; // Ensure the uid is available
    const storageRef = ref(storage, `users/${uid}/${file.name}`);

    try {
      await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(storageRef);
      setProfile(prevProfile => ({
        ...prevProfile,
        photoURL: photoURL
      }));
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const db = getFirestore();
    const uid = user.uid;
    const userRef = doc(db, "Users", uid);

    try {
      const updatedProfile = {};
      for (const key in profile) {
        if (profile[key] !== user[key] && profile[key] !== "") {
          updatedProfile[key] = profile[key];
        }
      }

      if (Object.keys(updatedProfile).length > 0) {
        await updateDoc(userRef, updatedProfile, { merge: true });

        const updatedUserSnapshot = await getDoc(userRef);
        if (updatedUserSnapshot.exists()) {
          let updatedUserData = updatedUserSnapshot.data();
          updatedUserData = { ...updatedUserData, uid: uid }; 
          setUser(updatedUserData);
          localStorage.setItem("user", JSON.stringify(updatedUserData));
        }
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className="user-profile">
        <div className="edit-form">
          <h2>Edit Profile</h2>
          <input
            type="file"
            id="photo"
            name="photo"
            onChange={handlePhotoChange}
          />
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={profile.name}
            onChange={handleChange}
          />
          <label htmlFor="gender">Gender:</label>
          <input
            type="text"
            id="gender"
            name="gender"
            value={profile.gender}
            onChange={handleChange}
          />
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={profile.dateOfBirth}
            onChange={handleChange}
          />
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={profile.country}
            onChange={handleChange}
          />
          <br />
          <button onClick={handleSave}>Save Changes</button>
          <button onClick={() => setIsEditing(false)}>
            Cancel Editing
          </button>{" "}
        </div>
      </div>
    );
  }

  return (
    <div className="user-profile">
      <div className="profile-header">
        <img src={user.photoURL} alt="User" className="profile-photo" />
        <div className="user-info">
          <h2>{user.username}</h2>
          <p>
            <strong>Name: </strong>
            {user.name}
          </p>
          <p>
            <strong>Gender:</strong> {user.gender}
          </p>
          <p>
            <strong>Date of Birth:</strong> {user.dateOfBirth}
          </p>
          <p>
            <strong>Member Since:</strong> {user.MemberSince}
          </p>
          <p>
            <strong>Country:</strong> {user.country}
          </p>
        </div>
      </div>
      <div className="ratings">
        <h3>User Ratings</h3>
        <ul>
          {profile.ratings.map((rating, index) => (
            <li key={index}>Rating: {rating}</li>
          ))}
        </ul>
      </div>
      <div className="top-picks">
        <h3>Top Picks</h3>
        <ul>
          {profile.topPicks.map((pick, index) => (
            <li key={index}>{pick}</li>
          ))}
        </ul>
      </div>
      <div className="reviews">
        <h3>Recent Reviews</h3>
        <ul>
          {profile.reviews.map((review, index) => (
            <li key={index}>{review}</li>
          ))}
        </ul>
      </div>
      <button onClick={handleEditClick}>Edit Profile</button>
    </div>
  );
};

export default UserProfile;
