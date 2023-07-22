import topView from "./../../public/Images/top-view-coworkers-team-working-office 1.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import fireStore from './../../utils/fireStore'
import { signInWithEmailAndPassword } from "firebase/auth";
import LocalStorage from './../../utils/localStorage';

// redux setup
import { useSelector, useDispatch } from 'react-redux'
import { login as loginReducer } from './../../redux/user';

function Login() {

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn );
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigator = useNavigate();

  const login = async (event) => {
    event.preventDefault();
    try {
      dispatch(loginReducer({userEmail: email}))
      const userCredential = await signInWithEmailAndPassword(fireStore.firebaseAuth, email, password);
      const user = userCredential.user;
      // Get the current date and time
      const currentDate = new Date();
      const timestamp = currentDate.getTime();

      // Update the user data in the database
      // const newUser = await fireStore.updateSingleData('users', user ,{ email, loginDate: currentDate, loginTime: timestamp });
      LocalStorage.setItem('userId', user.uid)
      // console.log(email);
      // console.log(password);
      navigator("/home");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
      // Handle error
    }
  };

  return (
    <div className="login">

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
              <button onClick={(e) => { navigator("/signup") }}>
                Sign up
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;
