import React, { useState } from "react";

function SectionInputs(Props) {
  const [data, setData] = useState(Props.values);
  const ValueChanges = (e, type) => {
    Props.setValues({
      ...data,
      [type]: e.target.value,
    });
    setData({
      ...data,
      [type]: e.target.value,
    });
  };

  return (
    <>
      <input
        type="text"
        placeholder="Title"
        onChange={(e) => ValueChanges(e, "title")}
      ></input>
      <input
        type="text"
        placeholder="Started At"
        onChange={(e) => ValueChanges(e, "startedAt")}
      ></input>
      <input
        type="text"
        placeholder="Ended At"
        onChange={(e) => ValueChanges(e, "endedAt")}
      ></input>
      <input
        type="text"
        placeholder="Location"
        onChange={(e) => ValueChanges(e, "location")}
      ></input>
      <input
        type="text"
        placeholder="Description"
        onChange={(e) => ValueChanges(e, "description")}
      ></input>
    </>
  );
}

export default SectionInputs;
