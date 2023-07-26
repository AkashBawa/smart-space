import topView from "./../public/Images/top-view-coworkers-team-working-office 1.png";
import { useNavigate } from "react-router-dom";
import fireStore from "../utils/fireStore";
import { useEffect, useState } from "react";
// import BookingList from "./booking/steps/booking-list";
import BookingListDemo from "./booking/steps/bookig-list-demo";
import LocaStorage from './../utils/localStorage';

const Home = () => {

  const [bookingList, setBookingList] = useState([]);

  const navigator = useNavigate();

  const navigateToBooking = () => {
    navigator("/booking")
  }

  useEffect(() => {
    //const res = await fireStore.getByQuery('booking', []);
    ///console.log('bookingList',res);
    fetchBookingList();
  }, []);

  const fetchBookingList = async () => {

    const res = await fireStore.getByQuery("bookings", [{
      propertyName: "userId",
      operation: "==",
      value: LocaStorage.getItem('userId')
    }])
    let responseBookingList = res.docs.map((doc) => {
      const bookingData = doc.data();
      return bookingData;
    });

    console.log("responseBookingList", responseBookingList);
    setBookingList(responseBookingList);
  };

  return (
    <div>
      {
        bookingList.length === 0 ? (

          <div className="Home">
            {/* <div className="shadow"> */}
              <div className="home-container">
                <img src={topView} alt="Langara" />
                <div className="shadow">
                  <div className="home-description">
                    <h2>Welcome to <br /> Our “Book a Smart Space” Service!</h2>
                    <p>We are delighted to assist you with your booking.</p>
                    <button className="booking-btn" onClick={navigateToBooking}>New Booking</button>
                  </div>
              </div>
            </div>
          </div>

        ) : (
          <BookingListDemo bookingList={bookingList} />
        )
      }
    </div>

  );
};

export default Home;