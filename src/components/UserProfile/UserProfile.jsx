
import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import personImage from './Assets/person.png';
import { getFirestore, doc, getDoc } from 'firebase/firestore';


const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    username: '',  
    name: '',
    gender: '',
    dateOfBirth: '',
    country: '',
    //photoUrl: '',
    joiningDate: '',
    ratings: [],
    topPicks: [],
    reviews: [],
    email: '',
  });

  

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const docRef = doc(db, 'Users', 'Ef77XyYkwCRJLtijHXuw');
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          console.log('Fetched user data:', userData);
          const bdate = userData.dateofbirth.toDate().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
          const joindate = userData.MemberSince.toDate().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
          console.log("bdate",bdate);
          console.log("joindate",joindate);
          setProfile((prevProfile) => ({
            ...prevProfile,
            username: userData.username || '',
            name: userData.Name || '', 
            gender: userData.Gender || '',
            dateOfBirth: bdate|| '', 
            country: userData.Country || '',
            joiningDate: joindate || '',
            ratings: userData.Ratings || [],
            topPicks: userData['Top picks'] || [],
            reviews: userData.Reviews || [],
            email: userData.email || '',

          }));
        } else {
          console.log('Document not found');
        }
      } catch (error) {
        console.error('Error getting user document:', error);
      }
    };
  
    fetchData();
  }, []);
  
  

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
          <p><strong>Date of Birth:</strong> {profile.dateOfBirth}</p>
          <p><strong>Member Since:</strong> {profile.joiningDate}</p>
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
