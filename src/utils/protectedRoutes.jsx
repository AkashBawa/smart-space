import { Navigate } from "react-router-dom";

const ProtectedRoute = (children ) => {

    // in real time we will check from out cookies
    const isLoggedIn = false;

    return isLoggedIn ? children : <Navigate to={'/login'}/>
}

export default ProtectedRoute;