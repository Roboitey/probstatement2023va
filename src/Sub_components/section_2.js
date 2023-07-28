import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "../Styles/Section_2.css";
import card_items from "../Data/Section_2_Card_data";

function Section_2() {
  return (
    <>
      <section id="section2">
        <div className="first-part">
          <div className="fp-cont">
            <div className="fp-cont-title">
              <p>Who is inBDPA for?</p>
            </div>
            <div className="fp-cont-desc">
              <p>Anyone looking to navigate their professional life.</p>
            </div>
            <div className="fp-cont-sugg">
              {card_items.map((item, key) => {
                return (
                  <div className="fp-cont-sugg-card" key={key}>
                    <div className="fp-cont-sugg-card-content">
                      <p>{item}</p>
                    </div>
                    <ArrowForwardIosIcon
                      sx={{ stroke: "#E1EBEE", strokeWidth: 1 }}
                      style={{ marginRight: "15px" }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="second-part">
          <div className="sp-img" />
        </div>
      </section>
    </>
  );
}

export default Section_2;
