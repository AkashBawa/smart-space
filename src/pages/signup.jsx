import topView from "./../public/Images/top-view-coworkers-team-working-office 1.png";
import { useNavigate } from 'react-router-dom';

const Signup = () => {

  const navigator = useNavigate();
  const signup = () => {
    navigator('/login')
  }

  return (
    <div className="signup">
          <div className="main-content">
      <img src={topView} alt="" />

      <div className="formDiv">
        <h1>User Log in</h1>
        <form action="#" class="form">
        <input
            type="text"
            id="signup-name"
            placeholder="Name"
            required
          />
          <input
            type="email"
            id="signup-lastname"
            placeholder="Last Name"
            required
          />
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
          <button id="log-in" onClick={signup}>Login</button>
        </form>
      </div>
    </div>
    </div>
  );
}
  
  export default Signup;
  