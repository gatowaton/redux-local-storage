import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers } from './features/authSlice';
import { addAllPosts} from './features/postSlice';
import CreatePost from './components/CreatePost';

function Home() {

  const dispatch = useDispatch();

  // Obtén los datos del usuario desde el estado de Redux.
  const user = useSelector((state) => state.auth.user);

  //todos los usuarios
  const users = useSelector((state) => state.auth.users);
  console.log(user)
  // Obtener las publicaciones desde el estado de Redux
  const posts = useSelector((state) => state.posts.posts);

  //estado de autentificacion
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);


  useEffect(() => {
    // Obtener la lista de usuarios desde el almacenamiento local
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    // Obtener la lista de posts desde el almacenamiento local
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];

  // Actualizar la lista de usuarios y de posts en el estado
  dispatch(getAllUsers(storedUsers));
  dispatch(addAllPosts(storedPosts));
  }, [dispatch]);

  return (
    <div className='page'>

      <h2>Welcome to the Home Page</h2>
      {user && (
        <div>
          <p>Hello, {user.username}!</p>
        </div>
      )}

{isAuthenticated && <CreatePost />}
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
      <div>
        {posts.map((post) => (
          <div className='post' key={post.createdAt}>
            <h3>{post.title}</h3>
            <p>Posted by {post.username} on {post.createdAt}</p>
            <hr/>
            <img className='post-img' src={post.image} alt={post.title} />
            <hr/>
            <p>{post.description}</p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Home