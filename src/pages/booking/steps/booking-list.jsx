import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fireStore from "../../../utils/fireStore";
import { spaceType } from "../../../constants/booking";

const BookingList = (props) => {
    const navigate = useNavigate();
    const [bookingList, setBookingList] = useState(props.bookingList);

    const handleNewBookingClick = () => {
        navigate("/booking");
    };

    const navigateToQr = (bookingId) => {
        navigate("/qr-page/" + bookingId);
    };

    const canceledBooking = async (booking) => {
        if (window.confirm("Are you sure you want to cancel this booking") == true) {
            // text = "You pressed OK!";
            booking.data.status = 'Cancelled';
            await fireStore.updateSingleData('bookings', booking.bookingId, booking.data);
            window.location.reload(); 
        } else {
            // text = "You canceled!";
        }
    }

    const navigateToRechedule = (bookingId) => {
        navigate("/booking/" + bookingId);
    }

    const checkoutBooking = async (booking) => {
        if (window.confirm("Are you sure you want to checkout this booking") == true) {
            // text = "You pressed OK!";
            booking.data.status = 'Checkout';
            await fireStore.updateSingleData('bookings', booking.bookingId, booking.data);
            window.location.reload(); 
        } else {
            // text = "You canceled!";
        }
    }

    // useEffect(() => {
    //     //const res = await fireStore.getByQuery('booking', []);
    //     ///console.log('bookingList',res);
    //     fetchBookingList();
    // }, []);

    // const fetchBookingList = async () => {
    //     const locationRes = await fireStore.getByQuery("locations", []);
    //     const tableRes = await fireStore.getByQuery("tables", []);
    //     const res = await fireStore.getByQuery("bookings", []);

    //     let responseBookingList = res.docs.map((doc) => {
    //         const bookingData = doc.data();
    //         const location = locationRes.docs
    //             .find((loc) => loc.id == bookingData.locationId)
    //             .data();
    //         const table = tableRes.docs
    //             .find((tbl) => tbl.id == bookingData.tableId)
    //             .data();
    //         return {
    //             data: bookingData,
    //             bookingId: doc.id,
    //             location: location,
    //             table: table,
    //         };
    //     });

    //     console.log("responseBookingList", responseBookingList);
    //     setBookingList(responseBookingList);
    // };

    return (
        <div className="BookingList">
            <div className="bookingListHeader">
                <div>
                    <h1>Your booking</h1>
                </div>
                <div>
                    <button className="newBooking-page" onClick={handleNewBookingClick}>
                        New Booking
                    </button>
                </div>
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
                            <div key={b.bookingId} className="dateUpadte">
                                <h3>{b.date}</h3>
                                <p><span className="updateSpan">Location: </span>{b.location.name} (Level: {b.data.level})</p>
                                <p><span className="updateSpan">People: </span>{b.data.people}</p>
                                <p><span className="updateSpan">Table No: </span>{b.table.name}</p>
                                <p><span className="updateSpan">SpaceType: </span>{b.data.spaceType}</p>
                                <p><span className="updateSpan">No Of Hours: </span>{b.data.hours.map((hour) => {
                                    return <span>{`${hour}-${hour+1}`}</span>
                                })}</p>
                                <p><span className="updateSpan">Status: </span>{b.data.status}</p>
                                <div className="btnDivBookingList">
                                    { b.data.status == 'Booked' ? <button className="btnBookingList" onClick={() => { navigateToQr(b.bookingId) }}>Check In</button> : ''}
                                    { b.data.status == 'Booked' ? <button className="btnBookingList" onClick={() => { navigateToRechedule(b.bookingId) }}>Rechedule</button> : ''}
                                    { b.data.status == 'Booked' ? <button className="btnBookingList" onClick={() => { canceledBooking(b) }}>Cancel</button> : ''}
                                    { b.data.status == 'Confirmed' ? <button className="btnBookingList" onClick={() => { checkoutBooking(b) }}>Checkout</button> : ''}
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
