import { Link, Outlet } from "react-router-dom";
import siteLogo from "./../Images/Langara-icon.jpeg";
import humicon from "./../public/Images/ICON-27.png";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useSelector, useDispatch } from 'react-redux'
import { login as loginReducer } from './../redux/user';


const Navigation = () => {
  const navigator = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
  const currentUrl = useSelector((state) => state.user.url)

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
      <header className="navigation">
        <img src={siteLogo} className="logo" alt="" onClick={logoHome} />

        {
          isLoggedIn && (
            <nav>

              <ul className="nav-bar">
                <li className="list-active">
            
                  <Link to="/home">Home</Link>{" "}
                </li>
                <li>
            
                  <Link to="/booking">Booking</Link>
                </li>
                <li>
            
                  <Link to="./contact-us">Contact Us</Link>
                </li>

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
           !isLoggedIn  ? (last == "signup" ? <button>Login</button> : <button>Signup</button> ) : ""
          }
          
        </div>
        <div className="humb">
          {
          <img src={humicon} className="humicon" alt="" onClick={logoHome} />
          }
          {
           !isLoggedIn  ? (last == "signup" ? <button>Login</button> : <button>Signup</button> ) : ""
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
