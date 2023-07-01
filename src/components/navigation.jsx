import { Link, Outlet } from "react-router-dom";

const Navigation = () => {
    return (
      <div>

        <div className="navigation">
              <ul>
                  <li> <Link to="/home">Home</Link> </li>
                  <li> <Link to="/booking">Booking</Link></li>
                  <li>  <Link to="/reschedule">Reschedule</Link></li>
                  <li>  <Link to="/login">login</Link></li>
                  <li>  <Link to="/signup">signup</Link></li>
              </ul>
        </div>
        <div className="main">
          <Outlet/>
        </div>

      </div>
    );
  }
  
  export default Navigation;
  