import React, { useState } from 'react';
import { addPost } from '../features/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import "./CreatePost.css"

function CreatePost() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
  });

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);

    // Obtener la lista de posts desde el estado
    const posts = useSelector((state) => state.posts.posts);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Obtener la fecha y hora actual
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();

    // Combinar los datos del formulario con la información adicional
    const newPost = {
      title: formData.title,
      description: formData.description,
      image: formData.image,
      username: currentUser.username,
      createdAt: formattedDate,
    };

    // Dispatch de la acción para agregar la nueva publicación
    dispatch(addPost(newPost));

    // Guardar el estado actualizado en localStorage después de agregar un post
    localStorage.setItem('posts', JSON.stringify([...posts, newPost]));

    // Limpiar el formulario
    setFormData({
      title: '',
      description: '',
      image: '',
    });
  };

  return (
    <div className='create-post'>
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
          <label>Title:</label>
        <div>
          <input className='create-post-input'
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
          <label>Description:</label>
        <div>
          <textarea className='create-post-input'
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
          <label>Image URL:</label>
        <div>
          <input className='create-post-input'
            type="text"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />
        </div>
        <button className="button-8" type="submit">Create Post</button>
      </form>
    </div>
  )
}

export default CreatePost