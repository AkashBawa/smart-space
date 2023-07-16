import topView from "./../public/Images/top-view-coworkers-team-working-office 1.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigator = useNavigate();

  const navigateToBooking = () => {
    navigator("/booking")
  }
  return (
    <div className="Home">
      <div className="home-container">
        <img src={topView} alt="Langara" />
        <div className="home-description">
          <h2>Welcome to <br /> Our “Book a Smart Space” Service!</h2>
          <p>We are delighted to assist you with your booking.</p>
          <button className="booking-btn" onClick={navigateToBooking}>New Booking</button>
        </div>
      </div>
    </div>
  );
};

export default Home;