import { Link, Outlet } from "react-router-dom";
import siteLogo from "./../public/Images/Logo/logo-Orange.png";
import Home from "../pages/home";
import { useNavigate } from "react-router-dom";



const Navigation = () => {
  const navigator = useNavigate();

  // functon to go home
  const logoHome = () => {
    navigator("/home");
  }

  return (
    <div>
      <header className="navigation">
        <img src={siteLogo} className="logo" alt="" onClick={logoHome} />
        <nav>
          <ul className="nav-bar">
            <li>
              {" "}
              <Link to="/home">Home</Link>{" "}
            </li>
            <li>
              {" "}
              <Link to="/booking">Booking</Link>
            </li>
            <li>
              {" "}
              <Link to="/reschedule">Reschedule</Link>
            </li>
            {/* <li>  <Link to="/login">login</Link></li>
                  <li>  <Link to="/signup">signup</Link></li>
                  <li>  <Link to="/qr-page">QR-SCAN</Link></li> */}
          </ul>
        </nav>

        <div>
          <p>A</p>
        </div>
      </header>

      <div className="main">
        <Outlet />
      </div>
    </div>
  );
};

export default Navigation;
