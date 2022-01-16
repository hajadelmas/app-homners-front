import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";


import * as AuthService from "./services/auth.service";
import IUser from './types/user.type';

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/Board/BoardUser";
import BoardModerator from "./components/Board/BoardModerator";
import BoardAdmin from "./components/Board/BoardAdmin";

import EventBus from "./common/EventBus";
import CompteRendu from "./components/compteRendu/CompteRendu";

// import { getCurrentUser } from "./services/auth.service";  
  
import ActionsAgents from "./components/ActionsAgents/ActionsAgents";

import { Navbar, Container, Nav } from 'react-bootstrap';
import "./App.scss";

const App: React.FC = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState<boolean>(false);
  const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);



  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", logOut);

    return () => {
      EventBus.remove("logout", logOut);
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };


  return (
    <>

      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="nav_custom">
        <Container>
        <Navbar.Brand href="#home">Homners Application</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">

          <Nav className="me-auto">
          {showModeratorBoard && (
                    <li className="nav-item">
                    <Link to={"/mod"} className="nav-link">
                        Moderator Board
                    </Link>
                    </li>
                )}

                {showAdminBoard && (
                    <>
                    <li className="nav-item">
                        <Link to={"/admin"} className="nav-link">
                        Admin Board
                        </Link>
                    </li>
                    
                    <li className="nav-item">
                        <Link to={"/register"} className="nav-link">
                        Nouveau client
                        </Link>
                    </li>
                    </>
                    
                )}

                {currentUser && (
                    <>
                    <li className="nav-item">
                        <Link to={"/user"} className="nav-link">
                        Votre Espace
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/comptes-rendus"} className="nav-link">
                        Comptes-rendus
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/actions-agents"} className="nav-link">
                        Actions de l'agent
                        </Link>
                    </li>
                    </>
                )}
          </Nav>

          {currentUser ? (
          <Nav>
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                Se deconnecter
              </a>
            </li>
          </Nav>
        ) : (
          <Nav className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Se connecter
              </Link>
            </li>

            
          </Nav>
        )}

        </Navbar.Collapse>
        </Container>
      </Navbar>




      <div className="container mt-3">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/login/*" element={<Login />} />
          <Route path="/register/*" element={<Register />} />
          <Route path="/profile/*" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/mod" element={<BoardModerator />} />
          <Route path="/admin" element={<BoardAdmin />} />
          <Route path="/comptes-rendus" element={<CompteRendu />} />
          <Route path="/actions-agents" element={<ActionsAgents />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
