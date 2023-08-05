import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fireStore from "../../../utils/fireStore";
import { Collapse, Calendar, Alert } from 'antd';
import * as dayjs from 'dayjs';
import LocaStorage from '../../../utils/localStorage';
import moment from "moment";
import BookingMonth from "./booking-month";


const BookingListDemo = () => {
  const wrapperStyle = {
    // width: 250,
    border: '1px solid #ccc',
    borderRadius: '6px',
  };

  const navigate = useNavigate();
  const [bookingList, setBookingList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [tableList, setTableList] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [currentView, setCurrentView] = useState();
  const [isDayView, setDayView] = useState(true);

  useEffect(() => {
    fetchLocationList();
    fetchTableList();
  }, []);

  useEffect(() => {
    fetchBookingList();
  }, [locationList, tableList, selectedDate]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      bookingList
        .filter(b => b.data.status === 'Confirmed')
        .forEach(b => {
          const timerId = `timer-${b.bookingId}`;
          const timer = document.getElementById(timerId);
          if (timer) {
            const now = moment();
            const maxHour = `${b.data.hours.sort()[b.data.hours.length - 1] + 1}`.padStart(2, '0');
            const endDateTime = moment(`${b.data.date} ${maxHour}:00:00`, 'YYYY-MM-DD HH:mm:ss');
            const duration = moment.duration(endDateTime.diff(now));
            if (duration.milliseconds() < 0) {
              console.log(duration.milliseconds());
              b.data.status = 'Pending';
              forceCheckoutBooking(b);
            } else {
              timer.innerHTML = `${duration.hours()} hr(s) ${duration.minutes()} min(s) ${duration.seconds()} secs`;
            }
          }
        })
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [bookingList]);

  useEffect(() => {
    setCurrentView('day')
  }, [])
  const fetchLocationList = async () => {
    const locationRes = await fireStore.getByQuery("locations", []);
    setLocationList(locationRes.docs);
  }

  const fetchTableList = async () => {
    const tableRes = await fireStore.getByQuery("tables", []);
    setTableList(tableRes.docs);
  }

  const fetchBookingList = async () => {
    if (locationList.length && tableList.length) {
      let query;
      if (selectedDate ) {
        query =  [{
          propertyName: "userId",
          operation: "==",
          value: LocaStorage.getItem('userId')
        }, {
          propertyName: "date",
          operation: "==",
          value: selectedDate.format('YYYY-MM-DD')
        }]
      } else {
        query =  [{
          propertyName: "userId",
          operation: "==",
          value: LocaStorage.getItem('userId')
        }]
      }
      const res = await fireStore.getByQuery("bookings", query);

      let responseBookingList = res.docs.map((doc) => {
        const bookingData = doc.data();
        const hours = bookingData.hours;

        if (hours && hours.length > 0) {
          bookingData['sTime'] = getTime(hours[0]);
          bookingData['eTime'] = getTime(hours[hours.length - 1] + 1);
        }

        const location = locationList
          .find((loc) => loc.id == bookingData.locationId)
          .data();
        const table = tableList
          .find((tbl) => tbl.id == bookingData.tableId)
          .data();
        return {
          data: bookingData,
          bookingId: doc.id,
          location: location,
          table: table,
        };
      });
      console.log("responseBookingList", responseBookingList);
      setBookingList(responseBookingList);
    }
  };

  const handleNewBookingClick = () => {
    navigate("/booking");
  };

  const onPanelChange = (value, mode) => {
    setSelectedDate(value);
  };

  const onSelectedDateChange = (newDate) => {
    setSelectedDate(newDate);
  }

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
      forceCheckoutBooking(booking);
    }
  }

  const forceCheckoutBooking = async (booking) => {
    booking.data.status = 'Checkout';
    await fireStore.updateSingleData('bookings', booking.bookingId, booking.data);
    await fetchBookingList();
  }

  const getTime = (number) => {
    if (number < 12) {
      return `${number} AM`
    } else if (number == 12) {
      return `${number} PM`
    } else {
      return `${number - 12} PM`
    }
  }

  const navigateToMonth = () => {
    // navigate("/booking-month")
    setDayView(false);
    setCurrentView('month')
  }

  const navigateToDay = () => {
    setDayView(true);
    setCurrentView('day')
  }

  return (
    <div className="BookingList">

      <div className="bookingTitle">
        <h1 >Your Booking</h1>
        <button className="newBooking-page" onClick={handleNewBookingClick}>
          New Booking
        </button>
      </div>



      <div className="mainBookingList">
        <div className="message-div">
          <div className="dateMonth">
            <button className={"dayview" + " " + (currentView == "day" ? "activeView": "")} onClick={navigateToDay} >Day</button>
            {/* <button className="weekview">Week</button> */}
            <button className={"monthview" + " " + (currentView == "month" ? "activeView": "")} onClick={navigateToMonth}>Month</button>
          </div>

          <div className="calender">
            <div style={wrapperStyle}>
              <Calendar fullscreen={false} onPanelChange={onPanelChange} defaultValue={selectedDate} value={selectedDate} onChange={onSelectedDateChange} />
            </div>
            {/* <input type="date" /> */}
          </div>
        </div>

        
        {
          isDayView && <div className="right-side">
          <div className="bookingListHeader">

            <div className="booking-grid">

            </div>
          </div>
          {bookingList.length > 0 &&
            (<Collapse
              size="large"
              accordion={true}
              items={bookingList.map((b) => ({
                key: b.bookingId,
                label: <h3 id="dateDiv">{b.data.date}</h3>,
                children: (
                  <div key={b.bookingId} className="dateUpadte">
                    <p>
                      <span className="updateSpan">Time: </span>
                      {b.data.sTime + " - " + b.data.eTime}
                    </p>
                    <p>
                      <span className="updateSpan">Building: </span>
                      {b.location.name} / Floor: {b.data.level} / Table No: {b.table.name}
                    </p>
                    <p>
                      <span className="updateSpan">Number Of People: </span>
                      {b.data.people}
                    </p>
                    {/* <p>
                    <span className="updateSpan">Table No: </span>
                    {b.table.name}
                  </p>
                  <p>
                    <span className="updateSpan">SpaceType: </span>
                    {b.data.spaceType}
                  </p> */}
                  
                    <p className="bold-text">
                      <span className="updateSpan">Status: </span>
                      {b.data.status}
                    </p>
                    {b.data.status === 'Confirmed' && (
                      <p >Checkout In: <span className="" id={`timer-${b.bookingId}`}></span></p>
                    )}
                    <div className="btnDivBookingList">
                      {b.data.status === 'Booked' && (
                        <button
                          className="btnBookingList"
                          onClick={() => navigateToQr(b.bookingId)}
                        >
                          Check In
                        </button>
                      )}
                      {b.data.status === 'Booked' && (
                        <button
                          className="btnBookingList"
                          onClick={() => navigateToRechedule(b.bookingId)}
                        >
                          Rechedule
                        </button>
                      )}
                      {b.data.status === 'Booked' && (
                        <button
                          className="btnBookingList"
                          onClick={() => canceledBooking(b)}
                        >
                          Cancel
                        </button>
                      )}
                      {b.data.status === 'Confirmed' && (
                        <button
                          className="btnBookingList"
                          onClick={() => checkoutBooking(b)}
                        >
                          Checkout
                        </button>
                      )}
                    </div>
                  </div>
                ),
              }))}
            />
            )}
          {bookingList.length == 0 && (
            <Collapse
              size="large"
              collapsible="disabled"
              items={[{
                label: <h3>No Booking</h3>
              }]}
            />
          )}
        </div>
        }

        {
          !isDayView && <div> 

            <BookingMonth/>

          </div>
        }
        

      </div>

    </div>
  );
};

export default BookingListDemo;
