import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './UserProfile.css'; // Make sure the path is correct
import personImage from './Assets/person.png';

// Inside UserProfile component
const UserProfile = () => {
    const { userId } = useParams(); // This is the correct place to call useParams
    const [profile, setProfile] = useState({
      username: '',
      gender: '',
      dateOfBirth: '',
      country: '',
      photoUrl: personImage, // Assuming this image exists in your assets folder
      ratings: [], // Array of ratings
      topPicks: [], // Array of top picks
      reviews: [] // Array of last 5 reviews
    });

    useEffect(() => {
        // Replace with actual user ID, possibly from route params
      
        fetch(`http://localhost:3001/api/users/${userId}`) // Adjust the URL as per your backend API
          .then(response => response.json())
          .then(data => setProfile(data))
          .catch(error => console.error('Error fetching user data:', error));
      }, [userId]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="user-profile">
      <div className="profile-header">
        <img src={profile.photoUrl || 'default-avatar.jpg'} alt="User" className="profile-photo"/>
        <div className="user-info">
          <h2>{profile.username}</h2>
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
