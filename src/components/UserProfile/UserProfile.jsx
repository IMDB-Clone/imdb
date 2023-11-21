import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore'; // Import methods from Firestore
import { db } from '../firebase'; // Adjust the path to where your firebase.js is located
import './UserProfile.css'; // Ensure this is the correct path to your CSS file
import personImage from './Assets/person.png'; // Ensure this is the correct path to your image file

const UserProfile = () => {
 // Ensure useParams is capturing the userId correctly
// Ensure useParams is capturing the userId correctly
const { userId } = useParams();

// Get the user ID from the URL
  const [profile, setProfile] = useState(null); // Initialize profile state as null

  console.log(userId); // Log the user ID to the console

  useEffect(() => {
    // Define an async function to fetch user data from Firestore
    const fetchUserProfile = async () => {
      if (userId) {
        console.log(userId);
        const userRef = doc(db, "users", userId); // Reference to the user document
        try {
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setProfile(userSnap.data()); // Set the user profile data to state
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        console.log('No user ID provided');
      }
    };

    fetchUserProfile(); // Call the function to fetch user data
  }, [userId]);

  // Helper function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // If the profile is null (data is not fetched yet or there's no user), show a loading indicator
  if (!profile) {
    return <div>Loading...</div>;
  }

  // Render the user profile data
  return (
    <div className="user-profile">
      <div className="profile-header">
        <img src={profile.photoUrl || personImage} alt="User" className="profile-photo"/>
        <div className="user-info">
          <h2>{profile.username}</h2>
          <p><strong>Name: </strong>{profile.name}</p> {/* Assuming the field is called 'name' */}
          <p><strong>Email:</strong> {profile.email}</p> {/* Assuming the field is called 'email' */}
          <p><strong>Gender:</strong> {profile.gender}</p>
          <p><strong>Date of Birth:</strong> {formatDate(profile.dateOfBirth)}</p>
          <p><strong>Country:</strong> {profile.country}</p>
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
    </div>
  );
};

export default UserProfile;
