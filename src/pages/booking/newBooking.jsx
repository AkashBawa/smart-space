import Booking2 from "./steps/booking2";
import BookingS1 from "./steps/booking1";
import { useState } from "react";
import Accordion from "@mui/material/Accordion"
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';


const NewBooking = () => {

  const [currentStep, setCurrentStep] = useState(1);
  const [userOptions, setUserOptions] = useState();
  const [expanded, setExpanded] = useState('panel1');

  const setPage = (pageNumber, userOptions) => {
    if(pageNumber == 2) {
      if(!userOptions || !userOptions.people || !userOptions.bookingDate || !userOptions.spaceType || !userOptions.building || !userOptions.level) {
        alert("Please choose all value");
        setCurrentStep(1)
        return;
      }
    }
    setUserOptions(userOptions);
    setCurrentStep(pageNumber);
  }

  const handleChange = () => {
    console.log("hangle change")
  }

  return (
    <div className="bookingPage">
      <div className="NewBooking">
        <h1>New Booking</h1>
        <div className="option" id="step1">
          <p onClick={() => {setPage(1)}}>Step 1</p>
          {
            currentStep == 1 ? <BookingS1 changePage={setPage}/> : ""
          }
        </div>
        <div className="booking2">
          <div className="option" id="step2">
              <p onClick={() => {setPage(2)}}>Step 2</p>
          </div>
          {
            currentStep == 2 ?<Booking2 changePage={setPage} userOptions={userOptions} /> : ""
          }
        </div>
        {/* <BookingS1/> */}
      </div>
    </div>
  )
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
