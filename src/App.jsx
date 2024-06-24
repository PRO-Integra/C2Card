import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";

import "../src/style/home.css";
;

function App() {

  const [selectedMenu, setSelectedMenu] = useState("/");
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
  
    <Router>
      <div className="App">
       {/* <div className="box-icone-menu-celular"  onClick={() => toggleMenu()}>
        <img
                className="icone-menu-celular"
                src={iconeMenu}
                alt="icone-menu-lateral"
              />
        </div>
        <div className={`menu-lateral ${menuOpen ? "open" : ""}`}>
          <div className="box-detalhe-menu"></div>
          <Link to="/pagina1">
            <div
              className={`box-menu-lateral-icone ${
                selectedMenu === "/pagina1" ? "selected" : ""
              }`}
              onClick={() => setSelectedMenu("/pagina1")}
            >
              <img
                className="icone-img-menu-lateral"
                src={iconeMenu1}
                alt="icone-menu-lateral"
              />
            </div>
          </Link>

          <Link to="/">
            <div
              className={`box-menu-lateral-icone ${
                selectedMenu === "/" ? "selected" : ""
              }`}
              onClick={() => setSelectedMenu("/")}
            >
              <img
                className="icone-img-menu-lateral"
                src={iconeMenu2}
                alt="icone-menu-lateral"
              />
            </div>
          </Link>
          <Link to="/pagina3">
            <div
              className={`box-menu-lateral-icone ${
                selectedMenu === "/pagina3" ? "selected" : ""
              }`}
              onClick={() => setSelectedMenu("/pagina3")}
            >
              <img
                className="icone-img-menu-lateral"
                src={iconeMenu3}
                alt="icone-menu-lateral"
              />
            </div>
          </Link>
          <Link to="/pagina4">
            <div
              className={`box-menu-lateral-icone ${
                selectedMenu === "/pagina4" ? "selected" : ""
              }`}
              onClick={() => setSelectedMenu("/pagina4")}
            >
              <img
                className="icone-img-menu-lateral"
                src={iconeMenu4}
                alt="icone-menu-lateral"
              />
            </div>
          </Link>
          <Link to="/pagina5">
            <div
              className={`box-menu-lateral-icone ${
                selectedMenu === "/pagina5" ? "selected" : ""
              }`}
              onClick={() => setSelectedMenu("/pagina5")}
            >
              <img
                className="icone-img-menu-lateral"
                src={iconeMenu5}
                alt="icone-menu-lateral"
              />
            </div>
          </Link>
          <Link to="/pagina6">
            <div
              className={`box-menu-lateral-icone ${
                selectedMenu === "/pagina6" ? "selected" : ""
              }`}
              onClick={() => setSelectedMenu("/pagina6")}
            >
              <img
                className="icone-img-menu-lateral"
                src={iconeMenu6}
                alt="icone-menu-lateral"
              />
            </div>
          </Link>
        </div>*/}
          
        <Routes>
          <Route path="/" element={<Login />} />{/*componente principal*/}
          
        </Routes>
      </div>
    </Router>
  );
 
}

export default App;
