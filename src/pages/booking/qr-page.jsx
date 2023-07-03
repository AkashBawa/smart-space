import qrScan from "./../../public/Images/qr-scan.png";
import { QrReader } from "react-qr-reader";
import { useState } from "react";

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
  const [qrData, setQrData] = useState("");
  const [scanning, setScanning] = useState(false);

  const handleScan = (data, err) => {
    console.log("inside handle scan")
    if (data) {
      setQrData(data.text);

      const url = data.text;
      if (url) {
        window.location.href = url;
      }

      setScanning(false); // Stop scanning after a successful scan
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
