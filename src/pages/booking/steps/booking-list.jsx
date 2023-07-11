import React from "react";
import { useNavigate } from "react-router-dom";


const BookingList = () => {
    const navigate = useNavigate();

    const handleNewBookingClick = () => {
        navigate("/booking1");
    };

    return (
        <div className="Reschedule">
            <div className="">
                <h1>Your booking</h1>
                <button className="newBooking-page" onClick={handleNewBookingClick}>
                    New Booking
                </button>
            </div>
            <div className="message-div">
                <div>
                    <h3>Message</h3>
                </div>
                <div>
                    <ul>
                        <li>
                            type the messge here
                        </li>
                        <li>
                            the library will be close on sunday
                        </li>
                    </ul>
                </div>

            </div>
            <div>
                <h3>june 14</h3>
                <p>date</p>
                <p>building</p>
                <p>no of people</p>
                <button>cancel</button>
                <button>Reschedule</button>
            </div>
            <div className="calender">
                <h3>Month</h3>
            </div>
        </div>
    );
};

export default BookingList;
