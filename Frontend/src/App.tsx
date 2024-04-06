import { Route, Routes } from "react-router-dom";
import Authenticate from "./Pages/Authenticate";
import { Signup } from "./Components/Signup";
import { Login } from "./Components/Login";
import Homepage from "./Pages/Homepage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="auth" element={<Authenticate />}>
          <Route path="signup" element={<Signup />} />
          <Route path="signin" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
