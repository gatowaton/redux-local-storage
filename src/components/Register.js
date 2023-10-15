import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../features/authSlice';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validar y guardar el nuevo usuario en Redux
      if (formData.username && formData.password) {
        // Dispatch de la acción 'register'
        await dispatch(register(formData));

        // Limpia el formulario
        setFormData({ username: '', password: '' });
      }
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      // Aquí puedes manejar el error de registro, si es necesario
    }
  };

  return (
    <div>
      <Link to="/">Home</Link>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;