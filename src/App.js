import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Signup from "./pages/signup";
import Login from "./pages/signin";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;