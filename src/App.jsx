import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";



function App() {

  const [selectedMenu, setSelectedMenu] = useState("/");
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (

    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />{/*componente principal*/}
        </Routes>
      </div>
    </Router>
  );

}

export default App;
