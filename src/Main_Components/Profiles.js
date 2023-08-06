import React from "react";
import { getProfile } from "../services/profileService";
import { useEffect } from "react";
import { useState } from "react";
import { redirect, useParams, useNavigate } from "react-router-dom";
import { UserEdit } from "../services/userService";
import { createConnections } from "../services/connectionService";
import md5 from "blueimp-md5";
import { addConnection } from "../services/userService";

import SectionInputs from "../Sub_components/sectionInputs";
import ConnectionList from "../Sub_components/connectionList";

import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";

import "../Styles/Profile.css";

function Profiles(Props) {
  //64a5685eb514057de4e2d42d
  const [EditMode, setEditMode] = useState(false);
  const [user, setUser] = useState({});
  const [about, setAbout] = useState("");
  const [Experience, setExperience] = useState([]);
  const [Education, setEducation] = useState([]);
  const [Volunteering, setVolunteering] = useState([]);
  const [Skills, setSkills] = useState([]);
  const [numExpInputFields, setNumExpInputFields] = useState(0);
  const [numEduInputFields, setNumEduInputFields] = useState(0);
  const [numVolInputFields, setNumVolInputFields] = useState(0);
  const [numSKillInputFields, setNumSkillInputFields] = useState(1);
  const emailAddress = "" + user["email"];
  const Nav = useNavigate();
  let { userId } = useParams();
  const [myProfile, setMyProfile] = useState(!userId);
  const [connections, setConnection] = useState([]);

  const processedEmail = md5(emailAddress.toLowerCase().trim(emailAddress));
  useEffect(() => {
    userId =
      !userId && localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))["user_id"]
        : userId;
    if (!userId) {
      Nav("/sign-up");
    } else {
      console.log(myProfile);
      getProfile(userId).then((profile) => {
        setUser(profile["user"]);
        setAbout(profile.user.sections?.about);
        setExperience(profile.user.sections?.experience);
        setEducation(profile.user.sections?.education);
        setVolunteering(profile.user.sections?.volunteering);
        setSkills(profile.user.sections?.skills);
      });
    }
  }, []);
  const applyChanges = () => {
    UserEdit(userId, about, Experience, Education, Volunteering, Skills);
    setEditMode(false);
    setUser({
      ...user,
      sections: {
        about: about,
        experience: Experience,
        education: Education,
        volunteering: Volunteering,
        skills: Skills,
      },
    });
  };
  useEffect(() => {
    console.log(userId);
    createConnections(userId).then((data) => {
      setConnection(data);
      console.log(data);
    });
  }, [userId]);

  return (
    <>
      <section className="profile-section-container">
        <div className="ps-profile-card">
          <img
            className="pc-back-img"
            src={
              "https://www.gravatar.com/avatar/" +
              processedEmail +
              "?d=identicon"
            }
            alt="not found"
          />
          <div className="pc-middle-part">
            <img
              className="pc-profile-img"
              src={
                "https://www.gravatar.com/avatar/" +
                processedEmail +
                "?d=identicon"
              }
              alt="not found"
            />

            {myProfile ? (
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
            ) : null}
          </div>
          <div className="pc-information">
            <div className="pc-info-name">
              <h1>{user["username"]}</h1>
            </div>
            <br />
            <div className="pc-info-email_type">
              <div className="pc-info-email">
                <div>
                  <p> Email Address: </p>
                  <strong>{user["email"]}</strong>
                </div>
              </div>
              <div className="pc-info-type">
                <p>{user["type"]}</p>
              </div>
            </div>
            <br />
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
                {user.sections?.experience.map((item, key, arr) => {
                  return (
                    <>
                      <div className="ac-description-edit-input-cont">
                        <SectionInputs
                          type="experience"
                          values={item}
                          setValues={setExperience}
                          key={key}
                          id={key}
                          arr={arr}
                        />
                      </div>
                    </>
                  );
                })}
                {Array.from({ length: numExpInputFields }, (_, index) => (
                  <>
                    <div className="ac-description-edit-input-cont">
                      <SectionInputs
                        type="experience"
                        values={{}}
                        setValues={setExperience}
                        key={user.sections?.experience.length}
                        id={user.sections?.experience.length}
                        arr={Experience}
                      />
                    </div>
                  </>
                ))}
                <div className="ac-description-edit-btn">
                  <button
                    onClick={() =>
                      setNumExpInputFields((prevNum) => prevNum + 1)
                    }
                  >
                    Add new Experience
                  </button>
                </div>
              </div>
            ) : (
              <div className="ac-description">
                {user.sections?.experience.map((item, key) => {
                  return (
                    <>
                      <hr />
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
                      <hr />
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
                {user.sections?.education.map((item, key, arr) => {
                  return (
                    <>
                      <div className="ac-description-edit-input-cont">
                        <SectionInputs
                          type="education"
                          values={item}
                          setValues={setEducation}
                          key={key}
                          id={key}
                          arr={arr}
                        />
                      </div>
                    </>
                  );
                })}
                {Array.from({ length: numEduInputFields }, (_, index) => (
                  <>
                    <div className="ac-description-edit-input-cont">
                      <SectionInputs
                        type="education"
                        values={{}}
                        setValues={setEducation}
                        key={user.sections?.education.length}
                        id={user.sections?.education.length}
                        arr={Education}
                      />
                    </div>
                  </>
                ))}
                <div className="ac-description-edit-btn">
                  <button
                    className="ac-description-edit-btn"
                    onClick={() =>
                      setNumEduInputFields((prevNum) => prevNum + 1)
                    }
                  >
                    Add new Education
                  </button>
                </div>
              </div>
            ) : (
              <div className="ac-description">
                {user.sections?.education.map((item, key) => {
                  return (
                    <>
                      <hr />
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
                      <hr />
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
                {user.sections?.volunteering.map((item, key, arr) => {
                  return (
                    <>
                      <div className="ac-description-edit-input-cont">
                        <SectionInputs
                          type="volunteering"
                          values={item}
                          setValues={setVolunteering}
                          key={key}
                          id={key}
                          arr={arr}
                        />
                      </div>
                    </>
                  );
                })}
                {Array.from({ length: numVolInputFields }, (_, index) => (
                  <>
                    <div className="ac-description-edit-input-cont">
                      <SectionInputs
                        type="volunteering"
                        values={{}}
                        setValues={setVolunteering}
                        key={user.sections?.volunteering.length}
                        id={user.sections?.volunteering.length}
                        arr={Volunteering}
                      />
                    </div>
                  </>
                ))}
                <div className="ac-description-edit-btn">
                  <button
                    onClick={() =>
                      setNumVolInputFields((prevNum) => prevNum + 1)
                    }
                  >
                    Add new Volunteering
                  </button>
                </div>
              </div>
            ) : (
              <div className="ac-description">
                {user.sections?.volunteering.map((item, key) => {
                  return (
                    <>
                      <hr />
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
                      <hr />
                    </>
                  );
                })}
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
              <div className=" skill-edit">
                {user.sections?.skills.map((item, key, arr) => {
                  return (
                    <input
                      key={key}
                      index={key}
                      value={item}
                      className="ac-description-edit-skill-input"
                      arr={arr}
                      onChange={(e, key) => {
                        const newArray = [...arr];
                        newArray[key] = e.target.value;
                        setSkills(newArray);
                      }}
                    />
                  );
                })}
                {Array.from({ length: numSKillInputFields }, (_, index) => (
                  <input
                    className="ac-description-edit-skill-input"
                    key={index}
                    type="text"
                    placeholder={`Skill`}
                    arr={Skills}
                    onChange={(e, key) => {
                      const newArray = [...user.sections?.skills];
                      newArray.push(e.target.value);
                      setSkills(newArray);
                    }}
                  />
                ))}
                <div className="ac-description-edit-btn">
                  <button
                    onClick={() =>
                      setNumSkillInputFields((prevNum) => prevNum + 1)
                    }
                  >
                    Add new Skill
                  </button>
                </div>
              </div>
            ) : (
              <div className="ac-description">
                <ul>
                  {user.sections?.skills.map((item, key) => {
                    return (
                      <li key={key} index={key}>
                        Skill: <strong>{item}</strong>
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
      {myProfile ? (
        <ConnectionList connections={connections} />
      ) : (
        <>
          <div className="connection_btn">
            <button
              type="button"
              onClick={() => {
                addConnection(
                  JSON.parse(localStorage.getItem("user"))["user_id"],
                  userId
                );
              }}
            >
              Add connection
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default Profiles;
