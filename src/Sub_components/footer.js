import React from "react";

function Footer() {
  return (
    <>
      <section className="footer">
        <div className="footer-container">
          <div className="f-title">
            <h1>inBDPA</h1>
          </div>
          <div className="f-lst">
            <div className="f-lst-column">
              <div className="f-lst-column-title">
                <h3>Some title</h3>
              </div>
              <div className="fl-lst-column-links">
                <div className="fl-lst-column-links-single">
                  <p>Action 1</p>
                </div>
                <div className="fl-lst-column-links-single">
                  <p>Action 2</p>
                </div>
                <div className="fl-lst-column-links-single">
                  <p>Action 3</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Footer;
