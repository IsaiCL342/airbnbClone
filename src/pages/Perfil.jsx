import { getUser, logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getReservasPorUsuario } from "../utils/reservas";
import { motion } from "framer-motion";

const Perfil = () => {
    const user = getUser();
    const reservas = user ? getReservasPorUsuario(user.email) : [];
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
        navigate("/login");
        }
    }, [user, navigate]);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto mt-20 p-6 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded shadow text-center"
        >
            <img
            src={`https://i.pravatar.cc/100?u=${user?.email}`}
            alt="Avatar"
            className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold mb-4">Mi perfil</h2>
            <p className="text-gray-700 mb-6">Sesión activa como:</p>
            <p className="text-blue-600 font-semibold mb-6">{user?.email}</p>
            <p className="text-gray-700 mt-4">
            Has realizado <span className="font-semibold">{reservas.length}</span> reserva{reservas.length !== 1 && "s"}.
            </p>
            <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
            >
                Cerrar sesión
            </button>
        </motion.div>
    );
};

export default Perfil;