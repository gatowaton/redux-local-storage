import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/authSlice'; // Asegúrate de importar la acción adecuadamente
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Obtén la función de navegación
    const users = useSelector((state) => state.auth.users);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, password } = formData;

        // Validar si el usuario existe en la lista de usuarios registrados
        const userToLogin = users.find(user => user.username === username && user.password === password);

        // Validar y enviar los datos de inicio de sesión a Redux
        if (userToLogin) {
            // Si el usuario existe, realiza el inicio de sesión
            dispatch(login({ username, password }));

            // Redirige al usuario al Home.
            navigate('/');

        } else {
            alert('Credenciales inválidas');
        }
        // Limpiar el formulario
        setFormData({ username: '', password: '' });
    };

    return (
        <div>
            <Link to={"/"}>
            home
            </Link>
            <h2>Login</h2>
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
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;