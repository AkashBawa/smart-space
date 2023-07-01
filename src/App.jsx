
import './scss/app.scss';
import { Routes, Route, BrowserRouter } from "react-router-dom";

// Import components that required for routing here
import Login from './pages/login';
import  Signup from './pages/signup';
import Navigation from './components/navigation';
import NotFound from './pages/notFound';
import ProtectedRoute from './utils/protectedRoutes';
import Home from './pages/home';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='login' element={ <Login/>} />
          <Route path='signup' element={ <Signup/>}/>
          <Route path='*' element={<Navigation/>}>
            <Route path='home' element={<Home/>}/>
            <Route path='*' element={ <NotFound/> }/>
          </Route>
          <Route path='*' Component={NotFound}/>
        </Routes>

    </div>
  );
}

export default App;
