import React, { useState } from "react";
import "../Styles/NavBar.css";
import Nav_Items from "../Data/NavBar_Data";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const ErrorMessage = ({ isOpen, setIsOpen, title, body }) => {
  const Nav = useNavigate()
  const LoggingOut = () => {
    localStorage.removeItem("user")
    setIsOpen(false)
    Nav("/")
    
  }
  if (!isOpen) return null;
  return (
    <Modal show={isOpen} onHide={() => setIsOpen(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={LoggingOut}>
          Yes, Log out
        </Button>
        <Button variant="secondary" onClick={() => setIsOpen(false)}>
          No, stay logged in
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

function NavBar() {
  const [MenuOpen, setMenuOpen] = useState(false);
  const [SureModalOpen, setSureModalOpen] = useState(false);
  return (
    <>
      <ErrorMessage
        isOpen={SureModalOpen}
        setIsOpen={setSureModalOpen}
        title="Are you sure you want to log out of inBDPA"
        body="if you press yes, you will be logged out but you could login in again with your username and password. !! Your information will be saved !!"
      />
      <nav className="navbar-container">
        <div className={MenuOpen ? "logo" : "logo-off"}>
          <a href="/">
            <div />
            <h1>inBDPA</h1>
          </a>
        </div>
        <div className={MenuOpen ? "navbar-links-nav" : "navbar-links-off"}>
          <ul>
            {Nav_Items.map((item, key) => {
              return (
                <li key={key}>
                  <a
                    href={item.Link}
                    className={
                      window.location.pathname === item.Link ? "active" : ""
                    }
                  >
                    {item.title}
                  </a>
                </li>
              );
            })}
            {localStorage.getItem("user") &&
              JSON.parse(localStorage.getItem("user"))["type"] ===
                "administrator" && (
                <li>
                  <a
                    href="/admin"
                    className={
                      window.location.pathname === "/admin" ? "active" : ""
                    }
                  >
                    Admin
                  </a>
                </li>
              )}
          </ul>
        </div>
        <div className={MenuOpen ? "btn-logins" : "btn-logins-off"}>
          {localStorage.getItem("user") ? (
            <a >
              <button
                className="btn-signOut"
                onClick={() => {
                  setSureModalOpen(true);
                }}
              >
                Log Out
              </button>
            </a>
          ) : (
            <>
              <a href="/login">
                <button className="btn-login">login</button>
              </a>
              <a href="/sign-up">
                <button className="btn-signUp">Sign up</button>
              </a>
            </>
          )}
        </div>
      </nav>
      <button
        className="menu-btn"
        onClick={() => {
          setMenuOpen(!MenuOpen);
        }}
      >
        <Icon icon="mingcute:menu-fill" width="30" height="30" />
      </button>
    </>
  );
}

export default NavBar;
