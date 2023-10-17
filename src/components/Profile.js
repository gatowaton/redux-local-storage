import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../features/authSlice';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    age: '',
    address: '',
    imageUrl: '',
  });
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        age: currentUser.age || '',
        address: currentUser.address || '',
        imageUrl: currentUser.imageUrl || "",
      });
    }
  }, [currentUser]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if (currentUser) {
      const updatedUser = { ...currentUser };
      updatedUser.age = formData.age;
      updatedUser.address = formData.address;
      updatedUser.imageUrl = formData.imageUrl;

      dispatch(updateProfile(updatedUser));
      setIsEditing(false);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <div className='profile-page'>
      <h2>User Profile</h2>
      {currentUser && (
        <div>
          <h3>Username: {currentUser.username}</h3>
          <p>Age: {currentUser.age}</p>
          <p>Address: {currentUser.address}</p>
          <img
            className='profile-img'
            src={formData.imageUrl} // Usa formData.imageUrl
            alt="User"
          />
        </div>
      )}

      {isEditing ? (
        <div>
          <label>
            Age:
            <input
              type="text"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </label>
          <label>
            Image URL:
            <input
              type="text"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
            />
          </label>
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      ) : (
        <button onClick={handleEditClick}>Edit Profile</button>
      )}
    </div>
  );
}

export default Profile;

