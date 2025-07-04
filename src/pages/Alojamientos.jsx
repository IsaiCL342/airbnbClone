import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Alojamientos = () => {
    const [alojamientos, setAlojamientos] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [ciudad, setCiudad] = useState("");
    const ciudadesDisponibles = [...new Set(alojamientos.map((a) => a.ubicacion))];
    const [ordenPrecio, setOrdenPrecio] = useState("");

    useEffect(() => {
        fetch("/data/alojamientos.json")
        .then((res) => res.json())
        .then((data) => {
            setAlojamientos(data);
            setLoading(false);
        })
        .catch((err) => {
            console.error("Error cargando alojamientos:", err);
            setLoading(false);
        });
    }, []);

    if (loading) return <p className="text-center mt-10">Cargando alojamientos...</p>;

    const alojFiltrados = alojamientos.filter((aloj) =>
        aloj.ubicacion.toLowerCase().includes(ciudad.toLowerCase())
    );

    return (
        <div className="p-6">
        {/* Dropdown de filtro */}
        <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Filtrar por ciudad:</label>
            <select
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600 transition-colors"
            >
            <option value="">Todas las ciudades</option>
            {ciudadesDisponibles.map((c, i) => (
                <option key={i} value={c}>
                {c}
                </option>
            ))}
            </select>
        </div>

        {/* filtro por precio */}
        <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Ordenar por precio:</label>
        <select
            value={ordenPrecio}
            onChange={(e) => setOrdenPrecio(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600 transition-colors"
        >
            <option value="">Sin orden</option>
            <option value="asc">Menor a mayor</option>
            <option value="desc">Mayor a menor</option>
        </select>
        </div>

        {/* Cards filtradas */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {alojamientos
                .filter((aloj) =>
                ciudad ? aloj.ubicacion.toLowerCase().includes(ciudad.toLowerCase()) : true
                )
                .sort((a, b) => {
                if (ordenPrecio === "asc") return a.precio - b.precio;
                if (ordenPrecio === "desc") return b.precio - a.precio;
                return 0;
                })
                .map((aloj, index) => (
                <motion.div
                    key={aloj.id}
                    onClick={() => navigate(`/alojamientos/${aloj.id}`)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative cursor-pointer border rounded shadow p-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:shadow-lg transition-colors"
                >
                    {aloj.favorito && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        Favorito entre huéspedes
                    </span>
                    )}
                    <img
                    src={aloj.imagen}
                    alt={aloj.titulo}
                    className="w-full h-48 object-cover mb-4 rounded"
                    />
                    <h3 className="text-xl font-bold">{aloj.titulo}</h3>
                    <p className="text-gray-600">{aloj.ubicacion}</p>
                    <p className="text-blue-600 font-semibold">${aloj.precio} / noche</p>
                    <p className="text-yellow-500 text-sm mt-1">
                    ⭐ {aloj.calificacion.toFixed(2)} / 5
                    </p>
                </motion.div>
                ))}
            </div>
        </div>
    );
};


export default Alojamientos;