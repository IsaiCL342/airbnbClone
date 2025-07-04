// Guarda los datos del usuario en localStorage
export const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
};

// Elimina la sesión del usuario
export const logout = () => {
    localStorage.removeItem("user");
};

// Obtiene el usuario actual (si existe)
export const getUser = () => {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : null;
};

// Verifica si hay una sesión activa
export const isAuthenticated = () => {
    return !!localStorage.getItem("user");
};