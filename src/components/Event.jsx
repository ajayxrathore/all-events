import React from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import EventSidebar from "./EventSidebar";

function Event() {
  const navigate = useNavigate();
  const homepage = () => {
    navigate("/");
  };
  return (
    <div className="page-wrapper">
      <div className="create-event-page-header">
        <div className="logo-wrapper">
          <img
            className="alleventslogo"
            src="https://cdn2.allevents.in/media-kit/svg/ae-logo-vector.svg"
            alt="AllEvents"
            onClick={homepage}
          />
        </div>
        <div className="right-header">
          <Link to="/create-event" className="create-event-header">
            <ion-icon name="add-outline"></ion-icon>
            Create Event
          </Link>
          <div className="help-feature">
            <ion-icon name="chatbubbles-outline"></ion-icon>
          </div>
          <div className="user-profile-menu">
            <ion-icon name="person-circle-outline"></ion-icon>
          </div>
        </div>
      </div>

      <div className="main-layout-container">
        <EventSidebar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Event;
