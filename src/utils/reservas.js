// Obtiene todas las reservas del localStorage
export const getReservas = () => {
    const data = localStorage.getItem("reservas");
    return data ? JSON.parse(data) : [];
};

// Guarda una nueva reserva
export const guardarReserva = (reserva) => {
    const reservas = getReservas();
    reservas.push(reserva);
    localStorage.setItem("reservas", JSON.stringify(reservas));
};

// Obtiene las reservas de un usuario específico
export const getReservasPorUsuario = (email) => {
    return getReservas().filter((r) => r.usuario === email);
};

//Cancela reserva
export const cancelarReserva = (index, email) => {
    const reservas = getReservas();
    const nuevas = reservas.filter((r, i) => !(i === index && r.usuario === email));
    localStorage.setItem("reservas", JSON.stringify(nuevas));
};