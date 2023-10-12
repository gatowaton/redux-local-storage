import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../features/authSlice';
import { Link } from 'react-router-dom';

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
    // Verifica que el usuario esté definido antes de actualizar el formulario
    if (currentUser) {
      setFormData({
        age: currentUser.age || '',
        address: currentUser.address || '',
        imageUrl: currentUser.imageUrl || '',
      });
    }
  }, [currentUser]);

  const handleEditClick = () => {
    // Habilita la edición del perfil
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Verifica que el usuario esté definido antes de actualizar el perfil
    if (currentUser) {
          // Crea una copia del objeto currentUser
    const updatedUser = { ...currentUser };
      // Actualiza el perfil en el estado local
      updatedUser.age = formData.age;
      updatedUser.address = formData.address;
      updatedUser.imageUrl = formData.imageUrl;

      // Envía los cambios al estado global a través de updateProfile
      dispatch(updateProfile(updatedUser));

      // Deshabilita la edición del perfil
      setIsEditing(false);
    }
  };

  const handleCancelClick = () => {
    // Cancela la edición del perfil y restaura los valores originales
    setIsEditing(false);
  };

  return (
    <div>
      <Link to={"/"}>
        home
      </Link>
      <h2>User Profile</h2>
      {currentUser && ( // Verifica que el usuario esté definido antes de mostrar su información
        <div>
          <h3>Username: {currentUser.username}</h3>
          <p>Age: {currentUser.age}</p>
          <p>Address: {currentUser.address}</p>
          <img src={currentUser.imageUrl} alt="User" />
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
