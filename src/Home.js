import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { logout, getAllUsers } from './features/authSlice';
import { addAllPosts} from './features/postSlice';
import CreatePost from './components/CreatePost';

function Home() {

  const dispatch = useDispatch();

  // Obtén los datos del usuario desde el estado de Redux.
  const user = useSelector((state) => state.auth.user);

  //todos los usuarios
  const users = useSelector((state) => state.auth.users);

  // Obtener las publicaciones desde el estado de Redux
  const posts = useSelector((state) => state.posts.posts);


  useEffect(() => {
    // Obtener la lista de usuarios desde el almacenamiento local
    const storedUsers = JSON.parse(localStorage.getItem('users'));
    // Obtener la lista de posts desde el almacenamiento local
    const storedPosts = JSON.parse(localStorage.getItem('posts'));

  // Actualizar la lista de usuarios y de posts en el estado
  dispatch(getAllUsers(storedUsers));
  dispatch(addAllPosts(storedPosts));
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

      <CreatePost />
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

      <h2>Posts:</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.createdAt}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <p>Posted by {post.username} on {post.createdAt}</p>
            <img src={post.image} alt={post.title} />
          </li>
        ))}
      </ul>

    </div>
  )
}

export default Home