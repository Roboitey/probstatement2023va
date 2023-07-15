import React from "react";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { getProfile } from "../services/profileService";
import { useEffect } from "react";
import { useState } from "react";

function Profiles() {
  const [user, setUser] = useState({});
  useEffect(() => {
    getProfile("64a5685eb514057de4e2d42d").then((profile) =>
      setUser(profile["user"])
    );
  }, []);
  return (
    <>
      <div className="profile-section-container">
        <div className="ps-profile-card">
          <img className="pc-back-img" src="#" alt="Not Found" />
          <img className="pc-profile-img" src="#" alt="Not Found" />
          <div className="pc-edit">
            <ModeEditOutlineOutlinedIcon />
          </div>
          <div className="pc-information">
            <div className="pc-info-name">
              <h1>{user["username"]}</h1>
            </div>
            <div className="pc-info-email/type">
              <div className="pc-info-email">
                <p>Email Address: {user["email"]}</p>
              </div>
              <div className="pc-info-type">
                <p>{user["type"]}</p>
              </div>
            </div>
            <div className="pc-info-views">
              <p>{user["views"]}</p>
            </div>
          </div>
        </div>
      </div>
      {/*<div>Profiles {user["user_id"]}</div>
      <div>Profile type: {user["type"]}</div>
      <div>Profile about: {user.sections?.about}</div>
  */}
    </>
  );
}

export default Profiles;
