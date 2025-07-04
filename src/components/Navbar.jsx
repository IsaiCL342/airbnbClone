import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout, getUser } from "../utils/auth";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useLayoutEffect, useState } from "react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import airbnbLogo from "../assets/airbnb-icon.svg";

const Navbar = () => {
    const navigate = useNavigate();
    const user = getUser();
    const [darkMode, setDarkMode] = useState(false);

    useLayoutEffect(() => {
        const stored = localStorage.getItem("darkMode") === "true";
        setDarkMode(stored);
        document.documentElement.classList.toggle("dark", stored);
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow transition-colors">
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-rausch">
            <img src={airbnbLogo} alt="Airbnb logo" className="h-6 w-6" />
            <span>Airbnb Clone</span>
        </Link>
        <div className="flex items-center space-x-4">
            {isAuthenticated() ? (
            <>
                    <span className="text-gray-500">Hola, {user.email}</span>
                    <Link to="/reservas" className="text-rausch hover:underline">Mis Reservas</Link>
                    <Link
                    to="/perfil"
                    title="Perfil"
                    className="inline-flex items-center justify-center ml-2"
                    >
                    <UserCircleIcon className="h-7 w-7 text-gray-800 dark:text-gray-100 hover:text-rausch transition" />
                    </Link>
                    <button
                    onClick={handleLogout}
                    title="Cerrar sesión"
                    className="inline-flex items-center justify-center text-red-500 hover:text-red-600 transition"
                    >
                    <ArrowRightOnRectangleIcon className="h-6 w-6" />
                    </button>
                    <button
                    onClick={() => {
                        const newMode = !darkMode;
                        setDarkMode(newMode);
                        localStorage.setItem("darkMode", newMode);
                        document.documentElement.classList.toggle("dark", newMode);
                    }}
                    className="text-xl transition hover:scale-110"
                    title="Alternar modo oscuro"
                    >
                    {darkMode ? "☀️" : "🌙"}
                    </button>
                </>
                ) : (
                <>
                    <Link to="/login" className="text-blue-600 hover:underline">Iniciar sesión</Link>
                    <Link to="/signup" className="text-blue-600 hover:underline">Registrarse</Link>
                </>
            )}
        </div>
        </nav>
    );
};

export default Navbar;