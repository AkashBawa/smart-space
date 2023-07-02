import { Link, Outlet } from "react-router-dom";
import siteLogo from "./../public/Images/Logo/logo-Orange.png"

const Navigation = () => {
    return (
      <div>

        <header className="navigation">
          <img src={siteLogo} alt="" />
              <ul>
                  <li> <Link to="/home">Home</Link> </li>
                  <li> <Link to="/booking">Booking</Link></li>
                  <li>  <Link to="/reschedule">Reschedule</Link></li>
                  {/* <li>  <Link to="/login">login</Link></li>
                  <li>  <Link to="/signup">signup</Link></li>
                  <li>  <Link to="/qr-page">QR-SCAN</Link></li> */}
              </ul>

              <div>
                
              </div>
        </header>
        
        <div className="main">
          <Outlet/>
        </div>

      </div>
    );
  }
  
  export default Navigation;
  