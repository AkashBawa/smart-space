import topView from "./../public/Images/top-view-coworkers-team-working-office 1.png";
import { useNavigate } from "react-router-dom"
import { useState } from 'react';
import  {addDataToCollection} from './../utils/fireStore'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigator = useNavigate();

  const login =  () => {
    // const auth = getAuth();
    // createUserWithEmailAndPassword(auth, email, password)
    //   .then( async (userCredential) => {
    //     // Signed in
    //     const user = userCredential.user;

    //     const newUser = await addDataToCollection('users', {email, id: user} )

    //     // ...
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // ..
    //   });

    // console.log(email);
    // console.log(password);
    navigator("/home");
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
            <button id="log-in" onClick={login}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

