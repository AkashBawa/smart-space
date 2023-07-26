import topView from "./../../public/Images/top-view-coworkers-team-working-office 1.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import fireStore from "../../utils/fireStore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import LocalStorage from './../../utils/localStorage';

import { useSelector, useDispatch } from 'react-redux';
import { login as loginReducer, setUrl, setNotification } from './../../redux/user';


const Signup = () => {
  const [name, setName] = useState("");
  const [lName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigator = useNavigate();
  const dispatch = useDispatch();

  const signup = (event) => {
    event.preventDefault();
    console.log(fireStore.firebaseAuth);
    createUserWithEmailAndPassword(fireStore.firebaseAuth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        const newUser = await fireStore.addDataToCollection("users", { name, lName, email, id: user.uid }, user.uid);
        // debugger;
        LocalStorage.setItem('userId', newUser.id);
        console.log("get value from local Storage ", LocalStorage.getItem("userId"))
        // alert("Sign up successful");
        dispatch(setNotification({
          type: "success",
          message: "Signup success"
        }))
        navigator("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        dispatch(setNotification({
          type: "error",
          message: "Something went wrong"
        }))
      });
   
  };

  return (
    <div className="signup">
      <div className="main-content">
        <img src={topView} alt="" />

        <div className="formDiv">
          <h1>User Sign Up</h1>
          <form action="#" className="form">
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              id="signup-name"
              placeholder="Name"
              required
            />
            <input
              value={lName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              type="text"
              id="signup-lastname"
              placeholder="Last Name"
              required
            />
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              id="signup-email"
              placeholder="email address"
              required
            />
            <input
              type="password"
              id="login-password"
              required
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button id="log-in-btn" onClick={signup}>
              Signup
            </button>
            <button onClick={(e) => {  dispatch(setUrl({url: 'login'})); navigator("/login") }}>
                Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
