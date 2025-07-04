    export const getReservas = () => {
        const data = localStorage.getItem("reservas");
        return data ? JSON.parse(data) : [];
    };

    export const getReservasPorUsuario = (email) => {
        return getReservas().filter((r) => r.usuario === email);
    };

    export const guardarReserva = (reserva) => {
        const reservas = getReservas();
        reservas.push(reserva);
        localStorage.setItem("reservas", JSON.stringify(reservas));
    };

    export const cancelarReserva = (reservaCancelada) => {
        const reservas = getReservas();
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