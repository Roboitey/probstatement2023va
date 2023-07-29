import React from "react";
import { getProfile } from "../services/profileService";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import md5 from 'blueimp-md5'

import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";

import "../Styles/Profile.css";

function Profiles() {
  const [EditMode, setEditMode] = useState(false);
  const [user, setUser] = useState({});
  const emailAddress = "some_exmapled@gmail.com";
  const { userId = JSON.parse(localStorage.getItem("user"))["user_id"] } =
    useParams();
  useEffect(() => {
    console.log(userId);
    getProfile(userId).then((profile) => setUser(profile["user"]));
  }, []);
  const md5Hash = md5(emailAddress);
  return (
    <>
      <section className="profile-section-container">
        <div className="ps-profile-card">
          <img
            className="pc-back-img"
            src={"https://www.gravatar.com/avatar/" + md5Hash}
            alt="not found"
          />
          <img
            className="pc-profile-img"
            src={"https://www.gravatar.com/avatar/" + md5Hash}
            alt="not found"
          />
          <button
            className="pc-edit"
            onClick={() => {
              setEditMode(!EditMode);
            }}
          >
            {EditMode ? (
              <CloseIcon
                fontSize="large"
                className="edit-icon"
                sx={{ color: "black" }}
              />
            ) : (
              <ModeEditOutlineOutlinedIcon
                fontSize="large"
                className="edit-icon"
                sx={{ color: "black" }}
              />
            )}
            <div className="edit-btn-tooltip">
              <p>{EditMode ? "Exit" : "Enter"} edit mode</p>
            </div>
          </button>

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
            <h5>
              {user["username"]} <span>&#183;</span> {user["type"]}
            </h5>
          </div>
          {EditMode ? (
            <div className="ac-description-edit">
              <textarea type="text" placeholder="Education">
                {user.sections?.about}
              </textarea>
            </div>
          ) : (
            <div className="ac-description">
              <p>{user.sections?.about}</p>
            </div>
          )}
        </div>
        <div className="ps-about-card">
          <div className="about-card">
            <h1>Experience</h1>
          </div>
          <div className="ac-name">
            <h5>
              {user["username"]} <span>&#183;</span> {user["type"]}
            </h5>
          </div>
          {EditMode ? (
            <div className="ac-description-edit">
              <textarea type="text" placeholder="About">
                {user.sections?.experience}
              </textarea>
            </div>
          ) : (
            <div className="ac-description">
              <p>{user.sections?.experience}</p>
            </div>
          )}
        </div>
        <div className="ps-about-card">
          <div className="about-card">
            <h1>Education</h1>
          </div>
          <div className="ac-name">
            <h5>
              {user["username"]} <span>&#183;</span> {user["type"]}
            </h5>
          </div>
          {EditMode ? (
            <div className="ac-description-edit">
              <textarea type="text" placeholder="Education">
                {user.sections?.education}
              </textarea>
            </div>
          ) : (
            <div className="ac-description">
              <p>{user.sections?.education}</p>
            </div>
          )}
        </div>
        <div className="ps-about-card">
          <div className="about-card">
            <h1>Volunteering</h1>
          </div>
          <div className="ac-name">
            <h5>
              {user["username"]} <span>&#183;</span> {user["type"]}
            </h5>
          </div>
          {EditMode ? (
            <div className="ac-description-edit">
              <textarea type="text" placeholder="Volunteering">
                {user.sections?.volunteering}
              </textarea>
            </div>
          ) : (
            <div className="ac-description">
              <p>{user.sections?.volunteering}</p>
            </div>
          )}
        </div>
        <div className="ps-about-card">
          <div className="about-card">
            <h1>Skills</h1>
          </div>
          <div className="ac-name">
            <h5>
              {user["username"]} <span>&#183;</span> {user["type"]}
            </h5>
          </div>
          {EditMode ? (
            <div className="ac-description-edit">
              <textarea type="text" placeholder="Skills">
                {user.sections?.skills}
              </textarea>
            </div>
          ) : (
            <div className="ac-description">
              <p>{user.sections?.skills}</p>
            </div>
          )}
        </div>
      </section>
      {EditMode ? (
        <div className="edit-submit-btn">
          <button type="button">Apply Changes</button>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Profiles;
