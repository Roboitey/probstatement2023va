import React from "react";
import { getProfile } from "../services/profileService";
import { useEffect } from "react";
import { useState } from "react";

function Profiles() {
  const [user, setUser] = useState({});
  useEffect(() => {
    getProfile("64a620b0dd993129321793c4").then((profile) =>
      setUser(profile["user"])
    );
  }, []);
  return <div>Profiles{user["username"]}</div>;
}

export default Profiles;
