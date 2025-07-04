import { getUser } from "../utils/auth";
import { useEffect, useState } from "react";
import { getReservasPorUsuario, cancelarReserva } from "../utils/reservas";

const Reservas = () => {
    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        const usuario = getUser();
        if (usuario) {
        const misReservas = getReservasPorUsuario(usuario.email);
        setReservas(misReservas);
        }
    }, []);

    const cancelarReserva = (reservaCancelada) => {
        const data = localStorage.getItem("reservas");
        const reservas = data ? JSON.parse(data) : [];
        const nuevas = reservas.filter(
            (r) =>
            !(
                r.usuario === reservaCancelada.usuario &&
                r.alojamiento === reservaCancelada.alojamiento &&
                r.fecha === reservaCancelada.fecha
            )
        );
        localStorage.setItem("reservas", JSON.stringify(nuevas));
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen transition-colors">
        <h2 className="text-2xl font-bold mb-4">Mis Reservas</h2>
        {reservas.length === 0 ? (
            <p className="text-gray-600">No tienes reservas aún.</p>
        ) : (
            <ul className="space-y-4">
            {reservas.map((reserva, index) => (
                <li key={index} className="border p-4 rounded space-y-1">
                    <p className="font-semibold text-lg">{reserva.alojamiento}</p>
                    <p className="text-sm text-gray-600">{reserva.ubicacion}</p>
                    <p className="text-sm text-gray-600">Precio: ${reserva.precio} / noche</p>
                    <p className="text-sm text-gray-500">Reservado el {new Date(reserva.fecha).toLocaleString()}</p>
                    <button
                    onClick={() => {
                        const usuario = getUser();
                        cancelarReserva({ ...reserva, usuario: usuario.email });
                        setReservas(getReservasPorUsuario(usuario.email));
                    }}
                    className="mt-2 text-red-600 hover:underline text-sm"
                    >
                    Cancelar reserva
                    </button>
                </li>
                ))}
            </ul>
        )}
        </div>
    );
};

export default Reservas;