
import './scss/app.scss';
import { Routes, Route, BrowserRouter } from "react-router-dom";

// Import components that required for routing here
import Login from './pages/login';
import  Signup from './pages/signup';
import Navigation from './components/navigation';
import NotFound from './pages/notFound';
import ProtectedRoute from './utils/protectedRoutes';
import Home from './pages/home';

import { addDoc, collection } from "@firebase/firestore"
import { firestore } from "./utils/fireStore";

function App() {

  const handleSubmit = async () => {
    console.log("indide handle submit")
    const ref = collection(firestore, "users") // Firebase creates this automatically
 
    let data = {
        name: "from firebase",
        email: "akash@firebase.com"
    }
    debugger;
    try {
        const add = await addDoc(ref, data);
        console.log(add);
    } catch(err) {
        console.log(err)
    }
  }
  return (
    <div className="App">
      <button onClick={handleSubmit}>aDD</button>
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
