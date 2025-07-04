import { Link } from "react-router-dom";
import { getUser } from "../utils/auth";

const Home = () => {
    const user = getUser();
    const fondo =
        "https://globetrender.com/wp-content/uploads/2019/07/Screenshot-2019-07-09-at-16.55.23-e1562693766805.png";

    return (
        <div
        className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white px-4"
        style={{ backgroundImage: `url(${fondo})` }}
        >
        <div className="bg-black bg-opacity-60 p-8 rounded shadow-md text-center max-w-xl">
            {user ? (
            <>
                <h1 className="text-3xl font-bold mb-4">
                ¡Bienvenido de nuevo, {user.email}!
                </h1>
                <p className="text-gray-200 mb-6">
                Nos alegra verte por aquí. ¿Listo para tu próxima aventura?
                </p>
            </>
            ) : (
            <>
                <h1 className="text-3xl font-bold mb-4">
                ¡Bienvenido a Airbnb Clone!
                </h1>
                <p className="text-gray-200 mb-6">
                Explora alojamientos únicos en todo México.
                </p>
            </>
            )}

            <Link
            to="/alojamientos"
            className="inline-block bg-[#FF385C] hover:bg-[#e03150] text-white px-6 py-3 rounded transition"
            >
            Explora alojamientos
            </Link>
        </div>
        </div>
    );
};

export default Home;