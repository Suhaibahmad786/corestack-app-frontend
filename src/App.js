import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Signup from "./pages/signup";
import Login from "./pages/signin";
import Dashboard from "./pages/dashboard";
import Contact from "./pages/contact"; 
import Price from "./pages/price";
import Weather from "./pages/weather";
import Courses from "./pages/courses";
import Success from "./pages/success";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/contact" element={<Contact />} />
               <Route path="/price" element={<Price />} />
               <Route path="/weather" element={<Weather />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/success" element={<Success />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;