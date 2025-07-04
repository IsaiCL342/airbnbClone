import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Alojamientos from "../pages/Alojamientos";
import PrivateRoute from "../routes/PrivateRoute";
import Detalle from "../pages/Detalle";
import Reservas from "../pages/Reservas";
import Perfil from "../pages/Perfil";

const AppRoutes = () => {
    const location = useLocation();

    const pageTransition = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        transition: { duration: 0.3 }
    };

    const withMotion = (element) => (
        <motion.div {...pageTransition}>{element}</motion.div>
    );

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
            <Route path="/" element={withMotion(<Home />)} />
            <Route path="/login" element={withMotion(<Login />)} />
            <Route path="/signup" element={withMotion(<Signup />)} />
            <Route
            path="/alojamientos"
            element={withMotion(
                <PrivateRoute>
                <Alojamientos />
                </PrivateRoute>
            )}
            />
            <Route
            path="/alojamientos/:id"
            element={withMotion(
                <PrivateRoute>
                <Detalle />
                </PrivateRoute>
            )}
            />
            <Route
            path="/reservas"
            element={withMotion(
                <PrivateRoute>
                <Reservas />
                </PrivateRoute>
            )}
            />
            <Route
            path="/perfil"
            element={withMotion(
                <PrivateRoute>
                <Perfil />
                </PrivateRoute>
            )}
            />
        </Routes>
        </AnimatePresence>
    );
};

export default AppRoutes;