import React, { useState } from "react";
import { useEventStore } from "../store/useEventStore";
import { db } from "../firebase/firestore";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function PublishEvent() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [listingType, setListingType] = useState("Public");
  const { eventData, resetEvent, setEventField } = useEventStore();
  const { location, name } = eventData;
  const handlePublish = async () => {
    try {
      await addDoc(collection(db, "events"), eventData);
      setShowSuccess(true);
      resetEvent();
      setTimeout(() => {
      navigate("/");
    }, 2500);
    } catch (err) {
      console.error("Error publishing event:", err);
    }
  };

  return (
    <div className="publish-page-container">
      {showSuccess && (
        <div className="success-popup">
          Your event has been successfully created!
        </div>
      )}
      <div className="publish-header">
        <h1 className="main-title">Your event is almost ready to publish</h1>
        <p className="main-subtitle">
          Review your settings and let everyone find your event.
        </p>
      </div>

      <div className="publish-layout">
        <div className="form-column">
          <div className="form-group">
            <label className="input-label">Event type</label>
            <select
              className="form-select"
              value={eventData.mainEventType}
              onChange={(e) => setEventField("mainEventType", e.target.value)}
            >
              <option value="">Select an Event Type</option>
              <option value="seminar">Seminar</option>
              <option value="concert">Concert</option>
              <option value="festival">Festival</option>
              <option value="performance">Performance</option>
            </select>
          </div>
          <div className="form-group">
            <label className="input-label">Event Category</label>
            <select
              className="form-select"
              value={eventData.mainEventCategory}
              onChange={(e) =>
                setEventField("mainEventCategory", e.target.value)
              }
            >
              <option value="">Select an Event Category</option>
              <option value="seminar">Single Parties</option>
              <option value="concert">Concerts</option>
              <option value="festival">Pool Parties</option>
              <option value="performance">Parties</option>
              <option value="performance">Performance</option>
            </select>
          </div>

          <div className="form-group">
            <label className="input-label">Listing type*</label>
            <div className="choice-buttons">
              <button
                className={`choice-button card ${
                  listingType === "Public" ? "active-card" : ""
                }`}
                onClick={() => setListingType("Public")}
              >
                Public
              </button>
              <button
                className={`choice-button card ${
                  listingType === "Private" ? "active-card" : ""
                }`}
                onClick={() => setListingType("Private")}
              >
                Private
              </button>
            </div>
          </div>

          {listingType === "Public" ? (
            <>
              {" "}
              <div className="form-group">
                <label className="input-label">
                  Choose when to notify your subscribers:
                </label>
                <div className="radio-group">
                  <label>
                    <input type="radio" name="notify" defaultChecked /> Now
                  </label>
                  <label>
                    <input type="radio" name="notify" /> Schedule
                  </label>
                  <label>
                    <input type="radio" name="notify" /> Don't Notify
                  </label>
                </div>
              </div>
              <div className="notification-box info">
                <p>
                  All people following you will receive event update via email.
                  You don't have any followers for selected Organizer.
                </p>
              </div>
            </>
          ) : (
            ""
          )}

          <div className="form-group toggle-group">
            <label className="input-label">
              Allow discussions on your event ⓘ
            </label>
            <label className="toggle-switch">
              <input type="checkbox" defaultChecked />
              <span className="slider"></span>
            </label>
          </div>

          <div className="form-group">
            <label className="input-label">Select organizer page*</label>
            <div className="organizer-select">
              <span>ajay rathore</span>
              <span className="select-arrow">▼</span>
            </div>
          </div>

          <button className="create-link">+ Create new organizer page</button>
        </div>

        <div className="preview-column">
          <div className="event-preview-card">
            <div key={eventData.id} className="publish-event-card">
              {eventData.banner && (
                <img
                  src={eventData.banner}
                  alt={eventData.name || "Event banner"}
                  className="publish-event-banner"
                />
              )}
              <span>{eventData.startDate}</span>
              <span>
                {" "}
                Timings: {eventData.startTime} - {eventData.endTime}
              </span>
              <span>•{eventData.activeLocation}</span>
              <p>{eventData.description}</p>
            </div>
            <div className="card-content">
              <p className="card-date-location">{location}</p>
            </div>
            <span className="favorite-icon"></span>
          </div>
          <a href="#" className="preview-link">
            Preview your event ↗
          </a>
        </div>
      </div>

      <div className="publish-footer">
        <button className="publish-button" onClick={handlePublish}>
          Publish
        </button>
      </div>
    </div>
  );
}

export default PublishEvent;
