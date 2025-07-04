import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { guardarReserva } from "../utils/reservas";
import { getUser } from "../utils/auth";
import { motion, AnimatePresence } from "framer-motion";

const Detalle = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [alojamiento, setAlojamiento] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reservaExitosa, setReservaExitosa] = useState(false);

    useEffect(() => {
        fetch("/data/alojamientos.json")
        .then((res) => res.json())
        .then((data) => {
            const encontrado = data.find((item) => item.id === parseInt(id));
            if (!encontrado) {
            navigate("/alojamientos"); // Redirige si no se encuentra
            } else {
            setAlojamiento(encontrado);
            }
            setLoading(false);
        })
        .catch((err) => {
            console.error("Error al cargar el detalle:", err);
            setLoading(false);
        });
    }, [id, navigate]);

    if (loading) return <p className="text-center mt-10">Cargando detalle...</p>;
    if (!alojamiento) return null;

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded shadow transition-colors">
            <img
            src={alojamiento.imagen}
            alt={alojamiento.titulo}
            className="w-full h-64 object-cover rounded mb-6"
            />
            <h2 className="text-3xl font-bold mb-2">{alojamiento.titulo}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-2">{alojamiento.ubicacion}</p>
            <p className="text-blue-600 dark:text-blue-400 font-semibold mb-4">
            ${alojamiento.precio} / noche
            </p>
            <p className="text-gray-700 dark:text-gray-200">{alojamiento.descripcion}</p>

            {/* ✅ Mensaje de éxito */}
            <AnimatePresence>
                {reservaExitosa && (
                    <motion.div
                    key="reserva-exitosa"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="mt-4 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 border border-green-300 dark:border-green-600 px-4 py-2 rounded shadow transition-colors"
                    >
                        ✅ ¡Reserva realizada con éxito!
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ✅ Botón de reserva */}
            <button
            onClick={() => {
                const usuario = getUser();
                if (!usuario) return;

                guardarReserva({
                usuario: usuario.email,
                alojamiento: alojamiento.titulo,
                precio: alojamiento.precio,
                ubicacion: alojamiento.ubicacion,
                fecha: new Date().toISOString(),
                });

                setReservaExitosa(true);
                setTimeout(() => setReservaExitosa(false), 4000);
            }}
            className="mt-6 bg-[#FF385C] text-white px-6 py-2 rounded hover:bg-[#e03150] transition"
            >
            Reservar ahora
            </button>
        </div>
    );
};

export default Detalle;