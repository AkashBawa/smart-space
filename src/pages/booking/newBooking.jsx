import Booking2 from "./steps/booking2";
import BookingS1 from "./steps/booking1";
import { useState } from "react";

const NewBooking = () => {

  const [currentStep, setCurrentStep] = useState(1);

  const setPage = (pageNumber) => {
    setCurrentStep(pageNumber)
  }

  return    <div>
    {
      currentStep == 1 ? <BookingS1 changePage={setPage}/> : <Booking2 changePage={setPage}/>
    }
    
    {/* <BookingS1/> */}
  </div>
    // <div className="NewBooking">
    //   <h1>Booking</h1>
    //   <div className="bookingForm">
    //     <div className="number">
    //       <label htmlFor="my-name">Number of people: </label>
    //       <div className="divForPeople">
    //       <span className="minus">-</span>
    //       <input id="my-name" className="dateBooking" type="text" value="1" />
    //       <span className="plus">+</span>
    //       </div>
  
    //     </div>
    //     <div className="number">
    //       <label htmlFor="dateBooking">Date: </label>
    //       <input
    //         id="dateBooking"
    //         className="dateBooking"
    //         type="date"
    //         value="1"
    //       />
    //     </div>
    //     <div className="number">
    //       <label for="floor">Choose a car: </label>
    //       <select id="floor" className="dateBooking" name="cars">
    //         <option value="volvo">Floor 1</option>
    //         <option value="saab">Floor 2</option>
    //         <option value="fiat">Floor 3</option>
    //         <option value="audi">Floor 4</option>
    //       </select>
    //     </div>
    //     <div className="number">
    //       <label for="floor">Choose a car: </label>
    //       <select id="floor" className="dateBooking" name="cars">
    //         <option value="volvo">Floor 1</option>
    //         <option value="saab">Floor 2</option>
    //         <option value="fiat">Floor 3</option>
    //         <option value="audi">Floor 4</option>
    //       </select>
    //     </div>
       
      
    //   </div>
    //   <div className="booking-btn-page">
    //     <button>Cancel</button>
    //     <button>Next</button>
    //     </div>
    // </div>

  
};

export default NewBooking;
