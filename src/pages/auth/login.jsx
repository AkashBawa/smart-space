import topView from "./../../public/Images/top-view-coworkers-team-working-office 1.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import fireStore from './../../utils/fireStore'
import { signInWithEmailAndPassword } from "firebase/auth";
import LocalStorage from './../../utils/localStorage';

// Components
import Loader from './../../components/loader';

// redux setup
import { useSelector, useDispatch } from 'react-redux'
import { login as loginReducer, setUrl, setNotification } from './../../redux/user';

function Login() {

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn );
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const navigator = useNavigate();

  const login = async (event) => {
    event.preventDefault();

    try {

      setLoader(true);

      const userCredential = await signInWithEmailAndPassword(fireStore.firebaseAuth, email, password);
      
      setTimeout(() => {
        
        dispatch(loginReducer({userEmail: email}))
        const user = userCredential.user;
        const currentDate = new Date();
        const timestamp = currentDate.getTime();
        LocalStorage.setItem('userId', user.uid)
        navigator("/home");
      }, 2000)
      

    } catch (error) {
      setLoader(false);
      dispatch(setNotification({
        type: 'error',
        message: `Wrong ID or Password`
      }))
    }
  };

  return (
    <div className="login">

      { 
        loader && <Loader/>
      }
      
      <div className="main-content">
        <img src={topView} alt="" />
        <div className="shadow">

          <div className="formDiv">
            <h1>User Log in</h1>
            <form action="" className="form">
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                id="login-email"
                placeholder="email address"
                required
              />
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                id="login-password"
                required
                placeholder="password"
              />
              <button id="log-in-btn" onClick={login}>
                Log in
              </button>
              {/* <button onClick={(e) => {  dispatch(setUrl({url: 'signup'})); navigator("/signup") }}>
                Sign up
              </button> */}
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;
