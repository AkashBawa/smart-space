import topView from "./../public/Images/top-view-coworkers-team-working-office 1.png";
import { useNavigate } from "react-router-dom"

function Login() {

  const navigator = useNavigate();
  const login = () => {
    navigator('/home')
  }

  return (
    <div className="login">
      <div className="main-content">
        <img src={topView} alt="" />

        <div className="formDiv">
          <h1>User Log in</h1>
          <form action="" class="form">
            <input
              type="email"
              id="login-email"
              placeholder="email address"
              required
            />
            <input
              type="password"
              id="login-password"
              required
              placeholder="password"
            />
            <button id="log-in" onClick={login}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
