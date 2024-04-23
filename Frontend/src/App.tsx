import { Route, Routes } from "react-router-dom";
import Authenticate from "./Pages/Authenticate";
import { Signup } from "./Components/Signup";
import { Login } from "./Components/Login";
import Homepage from "./Pages/Homepage";
import Dashboard from "./Pages/admin/hostel-admin/user_dashboard";
import Rooms from "./Pages/admin/hostel-admin/rooms";
import Meals from "./Pages/student/Meals";
import CouponsList from "./Pages/admin/mess-admin/coupons";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route path="/rooms" element={<Rooms />} />
        <Route path="auth" element={<Authenticate />}>
          <Route path="signup" element={<Signup />} />
          <Route path="signin" element={<Login />} />
        </Route>
        <Route path="/user">
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="meals" element={<Meals />} />
        </Route>
        <Route path="/mess-admin">
          <Route path="dashboard" element={<CouponsList />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
