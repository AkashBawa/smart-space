<<<<<<< HEAD:src/pages/qr-page.jsx
import qrScan from "./../public/Images/qr-scan.png";
import { QrReader } from "react-qr-reader";
import { useState } from "react";

const extractUrlFromData = (data) => {
  try {
    const parsedData = JSON.parse(data);
    return parsedData.url;
  } catch (error) {
    console.error("Error parsing scanned data:", error);
    return null;
  }
};
=======
import qrScan from "./../../public/Images/qr-scan.png"
>>>>>>> 695efc808c20ae945bebae89c6d9c6f6ad0c051e:src/pages/booking/qr-page.jsx

const Qrpage = () => {
  const [qrData, setQrData] = useState("");
  const [scanning, setScanning] = useState(false);

  const handleScan = (data) => {
    if (data) {
      setQrData(data);
      alert(data);

      const url = extractUrlFromData(data);
      if (url) {
        window.location.href = url;
        // console.log(url)
      }

      setScanning(false); // Stop scanning after a successful scan
    }
  };

  const handleError = (err) => {
    alert(err);
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
        <div>
          {scanning ? (
            <QrReader
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: "100%" }}
            />
          ) : (
            <button onClick={startScanning}>Start Scanning</button>
          )}
          <p>{qrData}</p>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Qrpage;
