import { Route, Routes } from "react-router";
import Homepage from "./page/Homepage";
import ProfilePage from "./page/ProfilePage";
import 'bootstrap/dist/css/bootstrap.min.css';
import Signout from "./Components/Signout";
import SuccessPage from "./Components/SuccessPage";
import FailedPage from "./Components/FailedPage";
// import UserProvider from "./Context/UserProvider";


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Homepage/>} />
      <Route path="/profile/:id" element={<ProfilePage/>} />
      <Route path="/signout" element={<Signout/>} />
      <Route path="/success/:orderId/:paymentId" element={<SuccessPage/>} />
      <Route path="/failed" element={<FailedPage/>}/>

    </Routes>
    </>
  );
}

export default App;
