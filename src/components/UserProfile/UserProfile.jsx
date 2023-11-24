import React, { useState } from 'react';
import './UserProfile.css'; 
import personImage from './Assets/person.png'; 

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false); 
  const [profile, setProfile] = useState({
    username: 'JohnDoe',
    name: 'John Doe',
    gender: 'Male',
    dateOfBirth: '1990-01-01',
    country: 'United States',
    photoUrl: '', 
    joiningDate: '2021-01-01',
    ratings: [4, 5, 3],
    topPicks: ['Movie A', 'Movie B', 'Movie C'],
    reviews: ['Great movie!', 'Disappointing ending.'],
    email: 'john.doe@example.com', 
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="user-profile">
        <div className="edit-form">
          <h2>Edit Profile</h2>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={profile.name} onChange={handleChange} />
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={profile.email} onChange={handleChange} />
          <label htmlFor="gender">Gender:</label>
          <input type="text" id="gender" name="gender" value={profile.gender} onChange={handleChange} />
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input type="date" id="dateOfBirth" name="dateOfBirth" value={profile.dateOfBirth} onChange={handleChange} />
          <label htmlFor="country">Country:</label>
          <input type="text" id="country" name="country" value={profile.country} onChange={handleChange} />
          <label htmlFor="photo">Photo:</label>
          <input type="file" id="photo" name="photo" onChange={handleChange} />
          <label htmlFor="joiningDate">Joining Date:</label>
          <input type="date" id="joiningDate" name="joiningDate" value={profile.joiningDate} onChange={handleChange} />
          <label htmlFor="ratings">Ratings:</label>
          <input type="text" id="ratings" name="ratings" value={profile.ratings.join(', ')} onChange={handleChange} />
          <label htmlFor="topPicks">Top Picks:</label>
          <input type="text" id="topPicks" name="topPicks" value={profile.topPicks.join(', ')} onChange={handleChange} />
          <label htmlFor="reviews">Reviews:</label>
          <input type="text" id="reviews" name="reviews" value={profile.reviews.join(', ')} onChange={handleChange} />

          <br />
          <button onClick={handleSave}>Save Changes</button>
          <button onClick={() => setIsEditing(false)}>Cancel Editing</button>
        </div>
      </div>
    );
  }

  return (

     <div className="user-profile">
     <div className="profile-header">
        <img src={profile.photoUrl || personImage} alt="User" className="profile-photo" />
        <div className="user-info">
          <h2>{profile.username}</h2>
          <p><strong>Name: </strong>{profile.name}</p>
          <p><strong>Gender:</strong> {profile.gender}</p>
          <p><strong>Date of Birth:</strong> {formatDate(profile.dateOfBirth)}</p>
          <p><strong>Member Since:</strong> {formatDate(profile.joiningDate)}</p>
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
      <button onClick={handleEditClick}>Edit Profile</button>
    </div>
  );
  
};

export default UserProfile;
