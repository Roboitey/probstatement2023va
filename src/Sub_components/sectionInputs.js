import React, { useState } from "react";
import "../Styles/sectionInputs.css";

function SectionInputs(Props) {
  const [data, setData] = useState(Props.values);
  const ValueChanges = (e, type) => {
    const newArray = [...Props.arr];
    console.log(Props.arr);
    if (newArray.length <= Props.id) {
      newArray.push({ [type]: e});
    } else {
      newArray[Props.id][type] = e;
    }
    if (!newArray[Props.id].endedAt) {  
      newArray[Props.id].endedAt = null;
    }
    Props.setValues(newArray);
    setData({
      ...data,
      [type]: e,
    });
  };

  return (
    <>
      <input
        className="section-inputs-input"
        type="text"
        placeholder="Title"
        onChange={(e) => ValueChanges(e.target.value, "title")}
        value={data.title}
      ></input>
      <input
        className="section-inputs-input"
        type="number"
        placeholder="Started At"
        onChange={(e) => ValueChanges(parseInt(e.target.value), "startedAt")}
        value={data.startedAt}
      ></input>
      <input
        className="section-inputs-input"
        type="number"
        placeholder="Ended At"
        onChange={(e) => ValueChanges(parseInt(e.target.value), "endedAt")}
        value={data.endedAt}
      ></input>
      <input
        className="section-inputs-input"
        type="text"
        placeholder="Location"
        onChange={(e) => ValueChanges(e.target.value, "location")}
        value={data.location}
      ></input>
      <input
        className="section-inputs-input"
        type="text"
        placeholder="Description"
        onChange={(e) => ValueChanges(e.target.value, "description")}
        value={data.description}
      ></input>
    </>
  );
}

export default SectionInputs;
