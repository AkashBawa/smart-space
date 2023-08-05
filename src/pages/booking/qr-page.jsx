import qrScan from "./../../public/Images/qr-scan.png";
import { QrReader } from "react-qr-reader";
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from "react-router-dom";
import fireStore from '../../utils/fireStore';
import moment from "moment";
import { notification } from 'antd';


const Qrpage = () => {
  const { id } = useParams();
  const [notificationApi, contextHolder] = notification.useNotification();

  const [qrData, setQrData] = useState("");
  const [scanning, setScanning] = useState(false);
  const [existingBooking, setExistingBooking] = useState();
  const [notificationMessage, setNotificationMessage] = useState(null);
  const lastResult = useRef();

  const navigate = useNavigate();


  useEffect(() => {
    loadExistingBooking();
  }, [setExistingBooking]);

  useEffect(() => {
    if (notificationMessage && notificationMessage.type) {
      if (notificationMessage.type == 'success') {
        notificationApi.success({
          message: notificationMessage.message
        });
      } else if (notificationMessage.type == 'error') {
        notificationApi.error({
          message: notificationMessage.message
        });
      }
    }
  }, [notificationMessage])


  const loadExistingBooking = async () => {
    if (id) {
      const booking = await fireStore.getById('bookings', id);
      if (!booking || !booking.data()) {
        setNotificationMessage({
          type: 'error',
          message: `Canot find booking id ${id}`
        });
      } else if (booking.data().status != 'Booked') {
        setNotificationMessage({
          type: 'error',
          message: `Your booking status is ${booking.data().status}`
        });
      } else {
        setExistingBooking(booking.data());
      }
    }
  }

  const handleScan = async (data, err) => {
    if (existingBooking && data) {
      if (lastResult.current === data.text) {
        return;
      }
      lastResult.current = data.text;
      if (data.text == existingBooking.tableId) {
        if (existingBooking.date && existingBooking.hours) {
          const minHour = `${existingBooking.hours.sort()[0]}`.padStart(2, '0');
          const maxHour = `${existingBooking.hours.sort()[existingBooking.hours.length - 1] + 1}`.padStart(2, '0');
          const startDateTime = moment(`${existingBooking.date} ${minHour - 1}:50:00`, 'YYYY-MM-DD HH:mm:ss');
          const endDateTime = moment(`${existingBooking.date} ${maxHour}:00:00`, 'YYYY-MM-DD HH:mm:ss');
          const now = moment(new Date());
          if (now.isBetween(startDateTime, endDateTime)) {
            setNotificationMessage({
              type: 'success',
              message: `Your booking is Confirmed`
            });
            existingBooking.status = 'Confirmed';
            await fireStore.updateSingleData('bookings', id, existingBooking);
            navigate('/home');

          } else {
            if (now.isBefore(startDateTime)) {
              setNotificationMessage({
                type: 'error',
                message: `You're ahead of time your booking start at ${startDateTime}`
              });
            } else if (now.isAfter(endDateTime)) {
              setNotificationMessage({
                type: 'error',
                message: `You're booking is already end since ${endDateTime}`
              });
            }

            setTimeout(() => {
              navigate('/home')
            }, 2000)
          }
        }
      } else {
        setNotificationMessage({
          type: 'error',
          message: `This table is not the one you booked table`
        });
        setTimeout(() => {
          navigate('/home')
        }, 2000)
      }
    }
  };

  const startScanning = () => {
    setScanning(true);
  };

  return (
    <>
      {contextHolder}
      <div className="qr-page">
        <div>
          <h1>Your Booking</h1>
        </div>
        <div className="qr-main">
          <div className="qr-main-img">
            <p>
              Please use your mobile to scan the QR code of your booking location to
              CHECK-IN
            </p>
            <img src={qrScan} className="qr-scan" alt="qrscan" />
            <p>
              If you are booking for a group of students, please all the students
              have to scan the code to check-in
            </p>
          </div>
          <div className="btnQr">
            {scanning ? (
              <QrReader
              delay={300}
              onResult={handleScan}
              style={{ width: '100%' }}
            />
            ) : ( 
              <button onClick={startScanning}>Start Scanning Here</button>
            )}
            <p>{qrData}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Qrpage;
