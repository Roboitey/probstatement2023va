import React from "react";
import "../Styles/Section_3.css";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Section_3() {
  return (
    <>
      <section id="sec3">
        <div className="left-title">
          <p>Find the right job or internship for you</p>
        </div>
        <div className="right-content">
          <div className="rc-title">
            <p>SUGGESTED SEARCHES</p>
          </div>
          <div className="rc-lst">
            <div className="rc-lst-ul">
              <div>Finance</div>
              <div>Business Development</div>
              <div>Engineering</div>
              <div>Administrative Assistant</div>
              <div>Retail Associate</div>
              <div>Customer Service</div>
              <div>Operations</div>
              <div>Information Technology</div>
              <div>Marketing</div>
              <div>Customer Service</div>
              <div>Human Resources</div>
              <div>Military and Protective Services</div>
            </div>
          </div>
          <div className="rc-btn">
            <button>Show More <ExpandLessIcon/></button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Section_3;
