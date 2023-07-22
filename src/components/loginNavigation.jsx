import { Link, Outlet } from "react-router-dom";
import siteLogo from "./../public/Images/Logo/logo-Orange.png";
import { useNavigate } from "react-router-dom";



const LoginNavigator = () => {
    const navigator = useNavigate();

    // functon to go home
    const logoHome = () => {
        navigator("/home");
    }
    return (
        <div>
            <header className="navigation login-nav">
                <img src={siteLogo} className="logo" alt="" onClick={logoHome} />
                <div>
                    <button>  </button>
                </div>
            </header>

            <div className="main">
                <Outlet />
            </div>
        </div>
    );
};

export default LoginNavigator;
