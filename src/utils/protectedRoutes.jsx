import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
// Redux store
import { useSelector, useDispatch } from "react-redux";
const ProtectedRoute = ( {children} ) => {

    // in real time we will check from out cookies
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

    // return isLoggedIn ? children : <Navigate to={'/login'}/>

    if (!isLoggedIn) {
        return <Navigate to={"/login"} replace />;
    }

    return (
    <div>
        {/* <Notification/> */}
        <Outlet />
    </div>
    );

}

export default ProtectedRoute;