import React, { useState } from 'react';
import { addPost } from '../features/postSlice';
import { useDispatch, useSelector } from 'react-redux';

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
    <div>
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  )
}

export default CreatePost