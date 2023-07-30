import React from "react";
import { getProfile } from "../services/profileService";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { UserEdit } from "../services/userService";
import SectionInputs from "../Sub_components/sectionInputs";
import md5 from "blueimp-md5";

import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";

import "../Styles/Profile.css";

function Profiles() {
  //64a5685eb514057de4e2d42d
  const [EditMode, setEditMode] = useState(false);
  const [user, setUser] = useState({});
  const [about, setAbout] = useState("");
  const [Experience, setExperience] = useState([]);
  const [Education, setEducation] = useState([]);
  const [Volunteering, setVolunteering] = useState([]);
  const [Skills, setSkills] = useState([]);
  const [numInputFields, setNumInputFields] = useState(1);
  const { userId = JSON.parse(localStorage.getItem("user"))["user_id"] } =
    useParams();
  useEffect(() => {
    console.log(userId);
    getProfile(userId).then((profile) => {
      setUser(profile["user"]);
      setAbout(profile.user.sections?.about);
      setExperience(profile.user.sections?.experience);
      setEducation(profile.user.sections?.education);
      setVolunteering(profile.user.sections?.volunteering);
      setSkills(profile.user.sections?.skills);
    });
  }, []);
  const applyChanges = () => {
    console.log(Education);
    UserEdit(userId, about, Experience, Education, Volunteering, Skills);
    setEditMode(false);
    setUser({
      ...user,
      sections: {
        about: about,
        experience: [Experience],
        education: [Education],
        volunteering: [Volunteering],
        skills: [Skills],
      },
    });
  };

  const handleAddInput = () => {
    // Increase the number of input fields by 1
    setNumInputFields((prevNum) => prevNum + 1);
  };

  return (
    <>
      <section className="profile-section-container">
        <div className="ps-profile-card">
          <img
            className="pc-back-img"
            src={
              "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
            }
            alt="not found"
          />
          <img
            className="pc-profile-img"
            src={
              "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
            }
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
        {EditMode || user.sections?.about !== {} ? (
          <div
            className="ps-about-card"
            style={{ height: EditMode ? "18pc" : "22pc" }}
          >
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
                <textarea
                  type="text"
                  placeholder="About"
                  onChange={(e) => {
                    setAbout(e.target.value);
                  }}
                  value={about}
                >
                  {user.sections?.about}
                </textarea>
              </div>
            ) : (
              <div className="ac-description">
                <p>{user.sections?.about}</p>
              </div>
            )}
          </div>
        ) : null}
        {EditMode || user.sections?.experience.length > 0 ? (
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
                {user.sections?.experience.map((item, key) => {
                  return (
                    <>
                      <SectionInputs
                        type="experience"
                        values={item}
                        setValues={setExperience}
                        key={key}
                        id={key}
                      />
                    </>
                  );
                })}
                <SectionInputs
                  type="experience"
                  values={{}}
                  setValues={setExperience}
                  key={user.sections?.experience.length + 1}
                  id={user.sections?.experience.length + 1}
                />
              </div>
            ) : (
              <div className="ac-description">
                {user.sections?.experience.map((item, key) => {
                  return (
                    <>
                      <p>
                        Title: <strong>{item.title}</strong>
                      </p>
                      <p>
                        Location: <strong>{item.location}</strong>
                      </p>
                      <p>
                        Start At:
                        <strong>
                          {new Date(item.startedAt).toDateString()}
                        </strong>
                      </p>
                      <p>
                        Ended At:
                        <strong>
                          {item.endedAt
                            ? new Date(item.endedAt).toDateString()
                            : "Present"}
                        </strong>
                      </p>
                      <p>
                        Description: <strong>{item.description}</strong>
                      </p>
                    </>
                  );
                })}
              </div>
            )}
          </div>
        ) : null}
        {EditMode || user.sections?.education.length > 0 ? (
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
                {user.sections?.education.map((item, key) => {
                  return (
                    <>
                      <SectionInputs
                        type="education"
                        values={item}
                        setValues={setEducation}
                        key={key}
                        id={key}
                      />
                    </>
                  );
                })}
                <SectionInputs
                  type="education"
                  values={{}}
                  setValues={setEducation}
                  key={user.sections?.education.length + 1}
                  id={user.sections?.education.length + 1}
                />
              </div>
            ) : (
              <div className="ac-description">
                {user.sections?.education.map((item, key) => {
                  return (
                    <>
                      <p>
                        Title: <strong>{item.title}</strong>
                      </p>
                      <p>
                        Location: <strong>{item.location}</strong>
                      </p>
                      <p>
                        Start At:
                        <strong>
                          {new Date(item.startedAt).toDateString()}
                        </strong>
                      </p>
                      <p>
                        Ended At:
                        <strong>
                          {item.endedAt
                            ? new Date(item.endedAt).toDateString()
                            : "Present"}
                        </strong>
                      </p>
                      <p>
                        Description: <strong>{item.description}</strong>
                      </p>
                    </>
                  );
                })}
              </div>
            )}
          </div>
        ) : null}
        {EditMode || user.sections?.volunteering.length > 0 ? (
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
                {user.sections?.volunteering.map((item, key) => {
                  return (
                    <>
                      <SectionInputs
                        type="volunteering"
                        values={item}
                        setValues={setVolunteering}
                        key={key}
                        id={key}
                      />
                    </>
                  );
                })}
                <SectionInputs
                  type="volunteering"
                  values={{}}
                  setValues={setVolunteering}
                  key={user.sections?.volunteering.length + 1}
                  id={user.sections?.volunteering.length + 1}
                />
              </div>
            ) : (
              <div className="ac-description">
                {user.sections?.volunteering.map((item, key) => {
                  return (
                    <>
                      <p>Title: {item.title}</p>
                      <p>Location: {item.location}</p>
                      <p>Start At: {new Date(item.startedAt).toDateString()}</p>
                      <p>
                        Ended At:{" "}
                        {item.endedAt
                          ? new Date(item.endedAt).toDateString()
                          : "Present"}
                      </p>
                      <p>Description: {item.description}</p>
                    </>
                  );
                })}{" "}
              </div>
            )}
          </div>
        ) : null}
        {EditMode || user.sections?.skills.length > 0 ? (
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
                {user.sections?.skills.map((item, key) => {
                  return <input key={key} index={key} value={item} />;
                })}
                {Array.from({ length: numInputFields }, (_, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder={`Skill ${index + 1}`}
                  />
                ))}
                <button onClick={handleAddInput}>Add new Skill</button>
              </div>
            ) : (
              <div className="ac-description">
                <ul>
                  {user.sections?.skills.map((item, key) => {
                    return (
                      <li key={key} index={key}>
                        Skill {key + 1}: <strong>{item}</strong>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        ) : null}
      </section>
      {EditMode ? (
        <div className="edit-submit-btn">
          <button type="button" onClick={applyChanges}>
            Apply Changes
          </button>
        </div>
      ) : null}
    </>
  );
}

export default Profiles;
