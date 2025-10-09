import React from "react";

function SectionCard6() {
  return (
    <div className="section-card6-container">
      <div className="section-card6">
        <img
          src="https://cdn5.allevents.in/new/images/vg/backcollage.jpg"
          alt=""
        />
        <div className="left-section-card6">
          <h2>Best of Jaipur Events in Your Inbox</h2>
          <p>
            Don't miss your favorite concert again. We deliver best of the city
            happenings and handpicked content for you every week. Subscribe
            weekly email newsletter for Jaipur.
          </p>
        </div>
        <div className="right-section-card6">
          <input type="text" placeholder="Enter your email here" />
          <button>Subscribe</button>
          <span>Join over a million newsletter subscribers.</span>
        </div>
      </div>
    </div>
  );
}

export default SectionCard6;
