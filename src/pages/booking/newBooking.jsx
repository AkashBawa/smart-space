import React, { useEffect, useState } from 'react';
import Booking2 from "./steps/booking2";
import BookingS1 from "./steps/booking1";
import Accordion from "@mui/material/Accordion"
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

import { useParams } from 'react-router';
import fireStore from '../../utils/fireStore';

const NewBooking = () => {

  const { id } = useParams();

  const [currentStep, setCurrentStep] = useState(1);
  const [userOptions, setUserOptions] = useState();
  const [expanded, setExpanded] = useState('panel1');
  const [existingBooking, setExistingBooking] = useState();

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

  useEffect(() => {
    console.log(id);
    loadExistingBooking();
  }, []);


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

  return (
    <div className="bookingPage">
      <div className="NewBooking">
        <h1>New Booking</h1>
        <div className="option" id="step1">
          <p onClick={() => {setPage(1)}}>Step 1</p>
          {
            currentStep == 1 ? <BookingS1 bookingId={id ? id : null} existingBooking={existingBooking ? existingBooking : null} changePage={setPage}/> : ""
          }
        </div>
        <div className="booking2">
          <div className="option" id="step2">
              <p onClick={() => {setPage(2)}}>Step 2</p>
          </div>
          {
            currentStep == 2 ? <Booking2 bookingId={id ? id : null} existingBooking={existingBooking ? existingBooking : null} changePage={setPage} userOptions={userOptions} /> : ""
          }
        </div>
      </div>
    </div>
  )

};

export default NewBooking;
