import React from "react";
import "../Styles/Section_1.css";

function Section_1() {
  return (
    <>
      <section className="sec-1">
        <div className="f-s">
          <div className="cont-t">
            <h1>
              <span>Start your </span>
              <br />
              <span>Online Reputation.</span>
            </h1>
          </div>
          <div className="cont-c">
            <p>
              Welcome to your professional community, where you get to know
              other professionals in various jobs and career paths. Start Now,
              this could be your first steps to be a well known professional.
            </p>
          </div>
          <div className="cont-b">
            <button>Learn more</button>
          </div>
        </div>
        <div className="right-img">
          <svg xmlns="https://static.licdn.com/aero-v1/sc/h/dxf91zhqd2z6b0bwg85ktm5s4" />
          <div />
        </div>
      </section>
    </>
  );
}

export default Section_1;
