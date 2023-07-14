import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fireStore from "../../../utils/fireStore";
import { spaceType } from "../../../constants/booking";

const BookingList = () => {
    const navigate = useNavigate();
    const [bookingList, setBookingList] = useState([]);

    const handleNewBookingClick = () => {
        navigate("/booking1");
    };

    const navigateToQr = () => {
        navigate("/qr-page");
    };

    useEffect(() => {
        //const res = await fireStore.getByQuery('booking', []);
        ///console.log('bookingList',res);
        fetchBookingList();
    }, []);

    const fetchBookingList = async () => {
        const locationRes = await fireStore.getByQuery("locations", []);
        const tableRes = await fireStore.getByQuery("tables", []);
        const res = await fireStore.getByQuery("bookings", []);

        let responseBookingList = res.docs.map((doc) => {
            const bookingData = doc.data();
            const location = locationRes.docs
                .find((loc) => loc.id == bookingData.locationId)
                .data();
            const table = tableRes.docs
                .find((tbl) => tbl.id == bookingData.tableId)
                .data();
            return {
                ...bookingData,
                location: location,
                table: table,
            };
        });

        console.log("responseBookingList", responseBookingList);
        setBookingList(responseBookingList);
    };

    return (
        <div className="BookingList">
            <div className="">
                <h1>Your booking</h1>
                <button className="newBooking-page" onClick={handleNewBookingClick}>
                    New Booking
                </button>
            </div>


            <div className="mainBookingList">
                <div className="message-div">
                    <div className="dateMonth">
                    <button>day</button>
                    <button>weeks</button>
                    <button>Month</button>
                    </div>
                  
                    <div className="calender">

                        <input type="date" />
                    </div>
                    <div>
                        <h3>Message</h3>
                    </div>
                    <div>
                        <ul>
                            <li>type the messge here</li>
                            <li>the library will be close on sunday</li>
                        </ul>
                    </div>
                </div>

                <div>
                    {bookingList.map((b) => {
                        return (
                            <div className="dateUpadte">
                                <h3>{b.date}</h3>
                                <p>Location: {b.location.name}</p>
                                <p>People: {b.people}</p>
                                <p>Table No: {b.table.name}</p>
                                <p>SpaceType: {b.spaceType}</p>
                                <p>No Of Hours: {b.hours.join(",")}</p>
                                <div className="btnBookingList">
                                    <button onClick={navigateToQr}>Check In</button>
                                </div>

                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
};

export default BookingList;
