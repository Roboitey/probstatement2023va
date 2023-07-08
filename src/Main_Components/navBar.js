import React from "react";
import "../Styles/NavBar.css";
import Nav_Items from "../Data/NavBar_Data";
import { useNavigate } from "react-router-dom";

function NavBar() {
  return (
    <>
      <div className="navbar-container">
        <div className="logo">
          <a>
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
            <button className="btn-signUp">Login</button>
          </a>
        </div>
      </div>
    </>
  );
}

export default NavBar;
