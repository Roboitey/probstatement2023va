import React, { useState } from "react";
import "../Styles/NavBar.css";
import Nav_Items from "../Data/NavBar_Data";
import { Icon } from '@iconify/react';

function NavBar() {
  const [MenuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <div className="navbar-container">
        <div className={MenuOpen ? "logo-off" : "logo"}>
          <a href="/">
            <div />
            <h1>inBDPA</h1>
          </a>
        </div>
        <nav className={MenuOpen ? "navbar-container-nav-off" : "navbar-container-nav"}>
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
      <button className="menu-btn" onClick={() => {setMenuOpen(!MenuOpen)}}>
        {MenuOpen ? (
          <Icon icon="line-md:menu-to-close-alt-transition" width="40" height="40" />
        ) : (
          <Icon icon="mingcute:menu-fill" width="40" height="40" />
        )}
      </button>
    </>
  );
}

export default NavBar;
