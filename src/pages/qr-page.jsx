import qrScan from "./../public/Images/qr-scan.png"

const Qrpage = () => {
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
        <p>If you are booking for a group of students, please all the students have to scan the code to check-in</p>
      </div>
    </div>
  );
};

export default Qrpage;
