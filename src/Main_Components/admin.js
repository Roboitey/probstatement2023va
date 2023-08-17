import React from "react";
import { useEffect } from "react";
import { getInfo } from "../services/adminService";
import { useState } from "react";
import "../Styles/Admin.css"

function Admin() {
  const [info, setInfo] = useState({});
  useEffect(() => {
    getInfo().then((data) => {
      console.log(data);
      if (data.success) {
        setInfo(data.info);
      }
    });
  }, []);
  useEffect(() => {
    console.log(info.users.username)
  })
  return (
    <>
      <div className="admin-container">
        <div className="admin-cont-title">
          <h1>Admin Statistics</h1>
        </div>
        <div className="admin-cont-information">
          <div className="admin-cont-info-body">
            <p className="admin-cont-info-body-label">sessions:</p>
            <p className="admin-cont-info-body-label-text">{info.sessions}</p>
          </div>
          <div className="admin-cont-info-body">
            <p className="admin-cont-info-body-label">views:</p>
            <p className="admin-cont-info-body-label-text">{info.views}</p>
          </div>
          <div className="admin-cont-info-body">
            <p className="admin-cont-info-body-label">opportunities:</p>
            <p className="admin-cont-info-body-label-text">
              {info.opportunities}
            </p>
          </div>
          <div className="admin-cont-info-body">
            <p className="admin-cont-info-body-label">users:</p>
            <p className="admin-cont-info-body-label-text">{info.users}</p>
          </div>
          <div className="admin-cont-info-body">
            <p className="admin-cont-info-body-label">Articles:</p>
            <p className="admin-cont-info-body-label-text">{info.articles}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
