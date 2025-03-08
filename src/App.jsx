import React from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { Home } from './Pages/Home';
import Login from './Components/Login';
const About = () => <h2>ℹ️ About Page</h2>;
const Contact = () => <h2>📞 Contact Page</h2>;

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App