import React from "react";
import "../Styles/NavBar.css";
import Nav_Items from "../Data/NavBar_Data";

function NavBar() {
  return (
    <>
      <div className="navbar-container">
        <div className="logo">
          <a>
            <div />
          </a>
        </div>
        <nav>
          <ul>
            {Nav_Items.map((item, key) => {
              return (
                <li key={key}>
                  <a href={item.Link} className={(window.location.pathname === item.Link) ? "active" : ""}>{item.title}</a>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="app-title">
          <h1>inBDPA</h1>
        </div>
      </div>
    </>
  );
}

export default NavBar;
