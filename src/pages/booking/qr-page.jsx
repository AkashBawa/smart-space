import qrScan from "./../../public/Images/qr-scan.png";
import { QrReader } from "react-qr-reader";
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from "react-router-dom";
import fireStore from '../../utils/fireStore';

// const extractUrlFromData = (data) => {
//   try {
//     const parsedData = JSON.parse(data);
//     return parsedData.url;
//   } catch (error) {
//     console.error("Error parsing scanned data:", error);
//     return null;
//   }
// };

const Qrpage = () => {
  const { id } = useParams();

  const [qrData, setQrData] = useState("");
  const [scanning, setScanning] = useState(false);
  const [existingBooking, setExistingBooking] = useState();
  const lastResult = useRef();

  const navigate = useNavigate();


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

  const handleScan = async (data, err) => {
    if (data) {
      if (lastResult.current === data.text) {
        return;
      }
      console.log("data", data)
      lastResult.current = data.text;
      if (data.text == existingBooking.tableId) {
        existingBooking.status = 'Confirmed';
        await fireStore.updateSingleData('bookings', id, existingBooking);
        window.location.href = '/booking-list'
      }
      // setScanning(false); // Stop scanning after a successful scan
    }
  };
  const startScanning = () => {
    setScanning(true);
  };

  return (
    <div className="qr-page">
      <div>
        <h1>Your Booking</h1>
      </div>
      <div className="qr-main">
        <p>
          Please use your mobile to scan the QR code of your booking location to
          CHECK-IN
        </p>
        <img src={qrScan} className="qr-scan" alt="qrscan" />
        <p>
          If you are booking for a group of students, please all the students
          have to scan the code to check-in
        </p>
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
  );
};

export default Qrpage;
