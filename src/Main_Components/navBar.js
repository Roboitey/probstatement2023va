import React, { useState } from "react";
import "../Styles/NavBar.css";
import Nav_Items from "../Data/NavBar_Data";
import { Icon } from "@iconify/react";

function NavBar() {
  const [MenuOpen, setMenuOpen] = useState(false);
  return (
    <>
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
                  <a aria-disabled
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
        </div>
        <div className="btn-logins">
          <a href="/login">
            <button className="btn-login">Login</button>
          </a>
          <a href="/sign-up">
            <button className="btn-signUp">Sign up</button>
          </a>
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
