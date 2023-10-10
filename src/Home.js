import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch  } from 'react-redux';
import { logout } from './features/authSlice';

function Home() {
      // Obtén los datos del usuario desde el estado de Redux.
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

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
    </div>
  )
}

export default Home