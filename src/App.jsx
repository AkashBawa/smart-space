import "./scss/app.scss";
import { Routes, Route, BrowserRouter } from "react-router-dom";

// Import components that required for routing here
import Login from "./pages/login";
import Signup from "./pages/signup";
import Navigation from "./components/navigation";
import NotFound from "./pages/notFound";
import ProtectedRoute from "./utils/protectedRoutes";
import Home from "./pages/home";
import Footer from "./components/footer";

import { addDoc, collection, getDocs, doc } from "@firebase/firestore";
import {
  firestore,
  addDataToCollection,
  getAllDataFromCollection,
} from "./utils/fireStore";
import collectionsName from "./constants/firebaseCollection";
import Qrpage from "./pages/qr-page";

function App() {
  const handleSubmit = async () => {
    const data = await getAllDataFromCollection("users");
    if (data) {
      data.forEach((user) => {
        console.log(user.data());
      });
    }
  };
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<Navigation />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="home" element={<Home />} />
          <Route path="qr-page" element={<Qrpage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" Component={NotFound} />
      </Routes>

      <Footer></Footer>
    </div>
  );
}

export default App;
