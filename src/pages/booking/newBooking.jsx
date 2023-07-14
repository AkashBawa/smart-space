import React, { useEffect, useState } from 'react';
import Booking2 from "./steps/booking2";
import BookingS1 from "./steps/booking1";
import { useParams } from 'react-router';
import fireStore from '../../utils/fireStore';

const NewBooking = () => {

  const { id } = useParams();

  const [currentStep, setCurrentStep] = useState(1);
  const [userOptions, setUserOptions] = useState();
  const [existingBooking, setExistingBooking] = useState();

  const setPage = (pageNumber, userOptions) => {
    setUserOptions(userOptions);
    setCurrentStep(pageNumber);
  }

  useEffect(() => {
    console.log(id);
    loadExistingBooking();
  }, [setExistingBooking]);


  const loadExistingBooking = async () => {
    if (id) {
      const booking = await fireStore.getById('bookings', id);
      if (!booking || !booking.data()) {
        alert('Canot find bookin id ' + id);
      } else {
        setExistingBooking(booking.data());
      }
    }
  }

  return <div>
    {
      currentStep == 1 ? <BookingS1 changePage={setPage} existingBooking={existingBooking} bookingId={id} /> : <Booking2 changePage={setPage} userOptions={userOptions} existingBooking={existingBooking} bookingId={id} />
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
