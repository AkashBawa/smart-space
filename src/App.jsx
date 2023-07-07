
import './scss/app.scss';
import { Routes, Route, Navigate } from "react-router-dom";

// Import components that required for routing here
import Login from './pages/auth/login';
import  Signup from './pages/auth/signup';
import Navigation from './components/navigation';
import NotFound from './pages/notFound';
import Home from './pages/home';
import Qrpage from './pages/booking/qr-page';
import Footer from './components/footer';
import NewBooking from './pages/booking/newBooking';
import Reschedule from './pages/booking/reschedule';
import AddLocation from './pages/admin/addLocation';
import AddTables from './pages/admin/addTables';
function App() {

  return (
    <div className="App">
        <Routes>
          <Route path='login' element={ <Login/>} />
          <Route path='signup' element={ <Signup/>}/>
          <Route path='admin/addLocation' element={ <AddLocation/>}/>
          <Route path='admin/addTable' element={ <AddTables/>}/>
          <Route path='signup' element={ <Signup/>}/>
          <Route path='*' element={<Navigation/>}>
            <Route path='home' element={<Home/>}/>
            <Route path='qr-page' element={<Qrpage/>}/>
            <Route path='booking' element={<NewBooking/>}/>
            <Route path='reschedule' element={<Reschedule/>}/>
            <Route path='*' element={ <Home/>}/>
          </Route>
        </Routes>

      <Footer></Footer>
    </div>
  );
}

export default App;
