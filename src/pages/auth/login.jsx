import topView from "./../../public/Images/top-view-coworkers-team-working-office 1.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import fireStore from './../../utils/fireStore'
import { signInWithEmailAndPassword } from "firebase/auth";
import LocalStorage from './../../utils/localStorage';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigator = useNavigate();

  const login = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(fireStore.firebaseAuth, email, password);
      const user = userCredential.user;
      debugger;
      // Get the current date and time
      const currentDate = new Date();
      const timestamp = currentDate.getTime();

      // Update the user data in the database
      // const newUser = await fireStore.updateSingleData('users', user ,{ email, loginDate: currentDate, loginTime: timestamp });
      LocalStorage.setItem('userId', user.id)
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
              Login
            </button>
            <button onClick={(e) => { navigator("/signup") }}>
                Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
