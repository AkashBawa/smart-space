import { Link, Outlet } from "react-router-dom";
import siteLogo from "./../public/Images/Logo/logo-Orange.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useSelector, useDispatch } from 'react-redux'
import { login as loginReducer, setUrl } from './../redux/user';

import Notification from "./../components/notification";

const Navigation = () => {
  const navigator = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
  const currentUrl = useSelector((state) => state.user.url)

  const dispatch = useDispatch();
  const url = useState(window.location.href)
  const [isAuthScreen, setAuthScreen] = useState(true);
  const [last, setLast] = useState("Login");

  useEffect(() => {
    onAuthScreen();
  }, [isLoggedIn, currentUrl])

  const onAuthScreen = () => {
    const spliUrl = window.location.href.split('/');
    const last = spliUrl[spliUrl.length - 1];
    setLast(last);
    if (last == 'login' || last == "signup") {
      setAuthScreen(true);
    } else {
      setAuthScreen(false);
    }
  }


  // functon to go home
  const logoHome = () => {
    navigator("/home");
  }

  return (
    <div>
      <Notification/>
      <header className="navigation">
        <Link to="/home"><img src={siteLogo} className="logo" alt="" onClick={logoHome} /></Link>

        {
          isLoggedIn && (
            <nav>

              <ul className="nav-bar">
                <li className= { currentUrl == "home" ? "list-active" : ""}>
            
                  <Link to="/home">Home</Link>{" "}
                </li>
                <li className= { currentUrl == "booking" ? "list-active": ""}>
            
                  <Link to="/booking" >Booking</Link>
                </li>
                {/* <li>
            
                  <Link to="./contact-us">Contact Us</Link>
                </li> */}

              </ul>
            </nav>
          )
        }


        <div className="mobAuth">
          {
            // Add drop down below A Icon
            isLoggedIn && <p>A</p>
          }
          {
           !isLoggedIn  ? (last == "signup" ? <button onClick={(e) => {  dispatch(setUrl({url: 'login'})); navigator("/login") }}>Login</button> : <button onClick={(e) => {  dispatch(setUrl({url: 'signup'})); navigator("/signup") }}>Signup</button> ) : ""
          }
          
        </div>
      </header>

      <div className="main">
        <Outlet />
      </div>
    </div>
  );
};

export default Navigation;
