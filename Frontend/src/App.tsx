import { Route, Routes } from "react-router-dom";
import Authenticate from "./Pages/Authenticate";
import { Signup } from "./Components/Signup";
import { Login } from "./Components/Login";
import Homepage from "./Pages/Homepage";
import {Dashboard} from "./Pages/student/dashboard";
import Rooms from "./Pages/admin/hostel-admin/rooms";
import Meals from "./Pages/student/Meals";
import CouponsList from "./Pages/admin/mess-admin/coupons";
import Page404 from "./Pages/Page404";
import Layout from "./Layout";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/404" element={<Page404 />} />

          
          <Route path="auth" element={<Authenticate />}>
            <Route path="signup" element={<Signup />} />
            <Route path="signin" element={<Login />} />
          </Route>
          <Route path="/user">
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="rooms" element={<Rooms />} />
            <Route path="meals" element={<Meals />} />
          </Route>
          <Route path="/mess-admin">
            <Route path="dashboard" element={<CouponsList />} />
          </Route>
        </Routes>
      </Layout>
    </>
  );
}

export default App;
