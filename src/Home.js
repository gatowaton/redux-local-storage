import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch  } from 'react-redux';
import { logout, getAllUsers } from './features/authSlice';

function Home() {
      // Obtén los datos del usuario desde el estado de Redux.
  const user = useSelector((state) => state.auth.user);
  //todos los usuarios
  const users = useSelector((state) => state.auth.users);
  const dispatch = useDispatch();

  
  useEffect(() => {
    // Obtener la lista de usuarios desde el almacenamiento local
    const storedUsers = JSON.parse(localStorage.getItem('users'));

    // Actualizar la lista de usuarios en el estado
    dispatch(getAllUsers(storedUsers));
  }, [dispatch]);

  const handleLogout = () => {
    // Dispatch de la acción de logout
    dispatch(logout());
  };
  return (
    <div>
        <Link to={"/login"}>
            <h2>login</h2>
        </Link>
        <Link to={"/register"}>
            <h2>Register</h2>
        </Link>
        <Link to={"/profile"}>
            <h2>Profile</h2>
        </Link>
        <h1>home</h1>
        <h2>Welcome to the Home Page</h2>
      {user && (
        <div>
          <p>Hello, {user.username}!</p>
          {/* Mostrar otros datos del usuario según sea necesario */}
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

<h2>Other Registered Users:</h2>
{users && users.length > 0 && (
  <div>
    <h2>Other Registered Users:</h2>
    <ul>
      {users
        .filter((u) => u.username !== user.username)
        .map((u) => (
          <li key={u.username}>
            {u.username} - Age: {u.age || 'N/A'}, Address: {u.address || 'N/A'}
          </li>
        ))}
    </ul>
  </div>
)}
    </div>
  )
}

export default Home