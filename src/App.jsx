
import './scss/app.scss';
import { Routes, Route, Navigate } from "react-router-dom";

// Import components that required for routing here
import Login from './pages/auth/login';
import Signup from './pages/auth/signup';
import Navigation from './components/navigation';
import NotFound from './pages/notFound';
import Home from './pages/home';
import Qrpage from './pages/booking/qr-page';
import Footer from './components/footer';
import NewBooking from './pages/booking/newBooking';
import Reschedule from './pages/booking/reschedule';
import AddLocation from './pages/admin/addLocation';
import AddTables from './pages/admin/addTables';
import ContactUs from './pages/contact-us';
// import BookingList from './pages/booking/steps/booking-list';
import BookingMonth from './pages/booking/steps/booking-month';
import BookingListDemo from './pages/booking/steps/bookig-list-demo';
import BookingWeek from './pages/booking/steps/booking-week';
import LandingPage from './pages/landingPage';
import ProtectedRoute from './utils/protectedRoutes';

function App() {

  // const implementQuery = async () => {
  //   const data = await fireStore.getByQuery('tables',[
  //     {propertyName: 'locationId', operation: '==', value:'aRcQTIOekeElB2Za0Ja1'},
  //     {propertyName: 'capacity', operation: '==', value: 4},
  //   ]);
  //   data.forEach((table) => {
  //     console.log(table.data())
  //   })
  // }

  // useEffect(() => {
  //   implementQuery()
  // }, [])
  // const test = async() => {
  //   const month = new Date().getMonth();
  //   const day = new Date().getDate();
  //   const year = new Date().getFullYear();
  //   const toDayDate = `2023-07-15`

  //   console.log(toDayDate);

  //   const query = {
  //       propertyName: 'date',
  //       operation: "==",
  //       value: toDayDate
  //   }
  //   const currentBooking = await fireStore.getByQuery("bookings", [query]);
  //   // debugger;
  //   if(currentBooking) {
  //     currentBooking.forEach((booking) => {
  //       console.log(booking.data())
  //     })
  //   } else {
  //     console.log("No booking found")
  //   }
  // }
  // test();

  return (
    <div className="App">
      
      <Routes>

        <Route path='admin/addLocation' element={<AddLocation />} />
        <Route path='admin/addTable' element={<AddTables />} />
        
        <Route path='/' element={<Navigation />}>
          <Route path='landingpage' element={<LandingPage />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />

          {/* Below routes require login to proceed */}
          
          <Route path="/" element={<ProtectedRoute/>}>
            
            <Route path='/home' element={<Home/>}/>
            <Route path='/contact-us' element={<ContactUs/>}/>
            <Route path='/booking-month' element={<BookingMonth/>}/>
            <Route path='contact-us' element={<ContactUs />} />
            <Route path='booking-month' element={<BookingMonth />} />
            <Route path='qr-page/:id' element={<Qrpage />} />
            <Route path='booking' element={<NewBooking />} />
            <Route path='booking/:id' element={<NewBooking />} />
            <Route path='reschedule' element={<Reschedule />} />
            <Route path='booking-month' element={<BookingMonth />} />
            <Route path='booking-week' element={<BookingWeek/>}/>
            <Route path='booking-list' element={<BookingListDemo />} />
            <Route path='booking-list-demo' element={<BookingListDemo />} />
            <Route path="*" element={<Navigate to="/login" replace />} />

          </Route>

          
          
        </Route>
      </Routes>

      <Footer></Footer>
    </div>
  );
}

export default App;
