import React from "react";
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
      <div>Profiles {user["user_id"]}</div>
      <div>Profiles {user["username"]}</div>
      <div>Profile email: {user["email"]}</div>
      <div>Profile type: {user["type"]}</div>
      <div>Profile about: {user.sections?.about}</div>
    </>
  );
}

export default Profiles;
