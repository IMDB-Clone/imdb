import React, { useState, useEffect, useContext } from 'react';
import './UserProfile.css';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { UserContext } from '../../services/usercontext';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user, updateUser } = useContext(UserContext);

  useEffect(() => {
    if (user && user.uid) {
      const fetchData = async () => {
        const db = getFirestore();
        const docRef = doc(db, 'users', user.uid);
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            updateUser({ ...user, ...userData }); // Update the context with fetched data
          } else {
            console.log('Document not found');
          }
        } catch (error) {
          console.error('Error getting user document:', error);
        }
      };
      fetchData();}
  }, [user, updateUser]);
  
  

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateUser((prevProfile) => ({
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
          <input type="text" id="name" name="name" value={user.name} onChange={handleChange} />
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={user.email} onChange={handleChange} />
          <label htmlFor="gender">Gender:</label>
          <input type="text" id="gender" name="gender" value={user.gender} onChange={handleChange} />
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input type="date" id="dateOfBirth" name="dateOfBirth" value={user.dateOfBirth} onChange={handleChange} />
          <label htmlFor="joiningDate">Member Since:</label>
          <input type="date" id="joiningDate" name="joiningDate" value={user.MemberSince} onChange={handleChange} />

          <label htmlFor="country">Country:</label>
          <input type="text" id="country" name="country" value={user.country} onChange={handleChange} />
          {/* Rest of the form fields */}
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

     {/* <img src="https://firebasestorage.googleapis.com/v0/b/project...token=..." alt="User" className='profile-photo' /> */}

        <div className="user-info">
          <h2>{user.username}</h2>
          <p><strong>Name: </strong>{user.name}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Date of Birth:</strong> {user.dateOfBirth}</p>
          <p><strong>Member Since:</strong> {user.MemberSince}</p>
          <p><strong>Country:</strong> {user.country}</p>
        </div>
      </div>
      {/* <div className="ratings">
        <h3>User Ratings</h3>
        <ul>
          {user.ratings.map((rating, index) => (
            <li key={index}>Rating: {rating}</li>
          ))}
        </ul>
      </div>
      <div className="top-picks">
        <h3>Top Picks</h3>
        <ul>
          {user.topPicks.map((pick, index) => (
            <li key={index}>{pick}</li>
          ))}
        </ul>
      </div>
      <div className="reviews">
        <h3>Recent Reviews</h3>
        <ul>
          {user.reviews.map((review, index) => (
            <li key={index}>{review}</li>
          ))}
        </ul>
      </div> */}
      <button onClick={handleEditClick}>Edit Profile</button>
    </div>
  );
  
};

export default UserProfile;