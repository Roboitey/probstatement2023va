import React, { useState } from "react";
import "../Styles/Section_3.css";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Rc_lst from "../Data/Rc_lst_data";
import { useNavigate } from "react-router-dom";

function Section_3() {
  const [expand, setExpand,] = useState(false);
  const Nav = useNavigate()
  return (
    <>
      <section className={expand ? "sec3-e" : "sec3-n"}>
        <div className="left-title">
          <p>Find the right job or internship for you</p>
        </div>
        <div className="right-content">
          <div className="rc-title">
            <p>SUGGESTED SEARCHES</p>
          </div>
          <div className={expand ? "rc-lst-e" : "rc-lst-n"}>
            <div className="rc-lst-ul">
              {Rc_lst.map((Item, key) => {
                return <div key={key}>{Item}</div>;
              })}
            </div>
          </div>
          <div className="rc-btn">
            <button
              onClick={() => {
                setExpand(!expand);
              }}
            >
              Show {expand ? "less" : "more"}
              {expand ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Section_3;
