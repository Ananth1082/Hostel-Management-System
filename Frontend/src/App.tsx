import { Route, Routes } from "react-router-dom";
import Authenticate from "./Pages/Authenticate";
import { Signup } from "./Components/Signup";
import { Login } from "./Components/Login";
import Homepage from "./Pages/Homepage";
import { Dashboard } from "./Pages/student/dashboard";
import Rooms from "./Pages/admin/hostel-admin/rooms";
import Meals from "./Pages/student/Meals";
import CouponsList from "./Pages/admin/mess-admin/coupons";
import Page404 from "./Pages/Page404";
import Layout from "./Layout";
import { Services } from "./Pages/student/Services";
import ServiceList from "./Pages/admin/clean-admin/serviceList";
// import User from "./Pages/student/user";
import UserRooms from "./Pages/student/Room";
import UserDashboard from "./Pages/admin/hostel-admin/user_dashboard";
import { User } from "lucide-react";
function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/404" element={<Page404 />} />

          <Route path="auth" element={<Authenticate />}>
            <Route path="signup" element={<Signup />} />
            <Route path="signin" element={<Login />} />
          </Route>
          <Route path="/user">
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="rooms" element={<UserRooms />} />
            <Route path="meals" element={<Meals />} />
            <Route path="services" element={<Services />} />
            {/* <Route path="user-info" element={<User />} /> */}
          </Route>
          <Route path="/mess-admin">
            <Route path="dashboard" element={<CouponsList />} />
          </Route>
          <Route path="/clean-admin">
            <Route path="dashboard" element={<ServiceList />} />
          </Route>
          <Route path="/hostel-admin" >
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="rooms" element={<Rooms />} />
          </Route>
        </Routes>
      </Layout>
    </>
  );
}

export default App;
