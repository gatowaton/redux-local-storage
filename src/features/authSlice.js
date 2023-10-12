import { createSlice } from '@reduxjs/toolkit';

// Función para obtener los datos del usuario desde el localStorage
const getUserDataFromLocalStorage = () => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
};

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: getUserDataFromLocalStorage() || {
            username: '', // otros campos existentes
            age: '',
            address: '',
            imageUrl: '',
            password: '',
        },
        users: getUserDataFromLocalStorage() ? [getUserDataFromLocalStorage()] : [], // Inicializa la lista de usuarios con el usuario actual
    },
    reducers: {
        login: (state, action) => {
            const { username, password } = action.payload;

            // Buscar el usuario en la lista de usuarios registrados
            const userToLogin = state.users.find(
                (user) => user.username === username && user.password === password
            );

            if (userToLogin) {
                state.isAuthenticated = true;
                state.user = userToLogin;

                // Guardar el usuario actual en el localStorage al iniciar sesión
                localStorage.setItem('user', JSON.stringify(userToLogin));
            } else {
                state.isAuthenticated = false;
            }
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = {
                username: '',
                age: '',
                address: '',
                imageUrl: '',
                password: '',
            };

            // Eliminar el usuario del localStorage al cerrar sesión
            localStorage.removeItem('user');
        },
        register: (state, action) => {
            // Agregar el nuevo usuario a la lista de usuarios
            state.users.push(action.payload);

            // Actualizar el usuario actual en el estado y en el localStorage
            // state.user = { ...action.payload };
            // localStorage.setItem('user', JSON.stringify(state.user));

            // Guardar la lista actualizada de usuarios registrados en el localStorage
            localStorage.setItem('users', JSON.stringify(state.users));
        },
        updateProfile: (state, action) => {
            const { username, age, address, imageUrl } = action.payload;
            state.user.username = username; // Actualiza el nombre de usuario
            state.user.age = age;
            state.user.address = address;
            state.user.imageUrl = imageUrl;

            // Actualiza los datos en el localStorage cuando se actualiza el perfil
            localStorage.setItem('user', JSON.stringify(state.user));

            // Actualiza también la lista de usuarios con los datos actualizados
            const updatedUserIndex = state.users.findIndex(user => user.username === state.user.username);
            if (updatedUserIndex !== -1) {
                state.users[updatedUserIndex] = { ...state.user };
                localStorage.setItem('users', JSON.stringify(state.users));
            }
        },
    },
});

export const { login, logout, register, updateProfile } = authSlice.actions;
export default authSlice.reducer;