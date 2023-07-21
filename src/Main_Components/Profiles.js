import React from "react";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { getProfile } from "../services/profileService";
import { useEffect } from "react";
import { useState } from "react";
import "../Styles/Profile.css";

function Profiles() {
  //myProfile 64bafa36c5c9fef93758df78
  const [user, setUser] = useState({});
  useEffect(() => {
    getProfile("64a5685eb514057de4e2d42d").then((profile) =>
      setUser(profile["user"])
    );
  }, []);
  return (
    <>
      <section className="profile-section-container">
        <div className="ps-profile-card">
          <div className="pc-back-img" />
          <div className="pc-profile-img" />
          <a href="/edit-profile">
            <div className="pc-edit">
              <ModeEditOutlineOutlinedIcon
                fontSize="large"
                className="edit-icon"
                sx={{ color: "black" }}
              />
            </div>
          </a>
          <div className="pc-information">
            <div className="pc-info-name">
              <h1>{user["username"]}</h1>
            </div>
            <div className="pc-info-email_type">
              <div className="pc-info-email">
                <p>
                  Email Address: <strong>{user["email"]}</strong>
                </p>
              </div>
              <div className="pc-info-type">
                <p>{user["type"]}</p>
              </div>
            </div>
            <div className="pc-info-views">
              <p>Views: {user["views"]}</p>
            </div>
          </div>
        </div>
        <div className="ps-about-card">
          <div className="about-card">
            <h1>About</h1>
          </div>
          <div className="ac-name">
            <h5>{user["username"]} <span>&#183;</span> {user["type"]}</h5>
          </div>
          <div className="ac-description">
            <p>{user.sections?.about}</p>
          </div>
        </div>
      </section>
      {/*<div>Profiles {user["user_id"]}</div>
      <div>Profile type: {user["type"]}</div>
  */}
    </>
  );
}

export default Profiles;
