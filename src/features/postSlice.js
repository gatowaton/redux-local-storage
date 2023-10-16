import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [], // Inicializa la lista de publicaciones
  },
  reducers: {
    addPost: (state, action) => {
      // Agrega una nueva publicación
      state.posts.push(action.payload);

      // Guardar el estado actualizado en el localStorage
      localStorage.setItem('posts', JSON.stringify(state.posts));
    },
    addAllPosts: (state, action) => {
      state.posts = action.payload;
    }
  },
});

export const { addPost , addAllPosts } = postSlice.actions;
export default postSlice.reducer;