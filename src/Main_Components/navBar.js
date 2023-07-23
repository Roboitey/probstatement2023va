import React, { useState } from "react";
import "../Styles/NavBar.css";
import Nav_Items from "../Data/NavBar_Data";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Icon } from '@iconify/react';

function NavBar() {
  const [MenuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <div className="navbar-container">
        <div className="logo">
          <a href="/">
            <div />
            <h1>inBDPA</h1>
          </a>
        </div>
        <nav>
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
          </ul>
        </nav>
        <div className="btn-logins">
          <a href="/login">
            <button className="btn-login">Login</button>
          </a>
          <a href="/sign-up">
            <button className="btn-signUp">Sign up</button>
          </a>
        </div>
      </div>
      <button className="menu-btn">
        {MenuOpen ? (
          <CloseIcon sx={{ color: "black" }} fontSize="large"/>
        ) : (
          <Icon icon="oi:menu" width="170" height="170" />
        )}
      </button>
    </>
  );
}

export default NavBar;
