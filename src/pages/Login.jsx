import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/auth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validación básica
        if (!email || !password) {
            setError("Todos los campos son obligatorios.");
            return;
        }

    // Simulación de login exitoso
    login({ email });
    navigate("/");
    };
    
    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded shadow transition-colors">
        <h2 className="text-2xl font-bold mb-4 text-center">Iniciar sesión</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
            <label className="block text-sm font-medium">Correo electrónico</label>
            <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tucorreo@example.com"
            />
            </div>
            <div>
            <label className="block text-sm font-medium">Contraseña</label>
            <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
            />
            </div>
            <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
            Iniciar sesión
            </button>
        </form>
        </div>
    );
};

export default Login;