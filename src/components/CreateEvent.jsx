import Header from "./Header.jsx";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
function CreateEvent() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [youtubeVideoLink, setYoutubeVideoLink] = useState("");
  const [vimeoVideoLink, setVimeoVideoLink] = useState("");
  const { currentUser } = useAuth();
  const [activeLocation, setActiveLocation] = useState("venue");
  const [eventType, setEventType] = useState("single");
  const [activeRecordSource, setActiveRecordSource] = useState("youtube");
  useEffect(() => {
    if (!currentUser) {
      alert("Please Sign In to add Events");
      navigate("/");
    }
  }, [currentUser, navigate]);
  if (!currentUser) {
    return null;
  }
  return (
    <>
      <div className="create-event-page-header">
        <Header showSearch={false} />
      </div>
      <div className="create-event-page">
        <div className="create-event-container">
          <h1>Create an Event</h1>
          <label htmlFor="name">Event Name*</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter the Name of your event"
            required
          ></input>
          <h1>Location</h1>
          <p>Choose where your event will take place</p>
          <p>Where will your event take place? </p>
          <div className="location-section">
            <div className="venue-location-card">
              <div
                className={`venue-card ${
                  activeLocation === "venue" ? "active-card " : ""
                }`}
                onClick={() => setActiveLocation("venue")}
              >
                <ion-icon name="location-outline"></ion-icon>
                <h3>Venue</h3>
                <p>Host in-person events with check-in management. </p>
              </div>
            </div>
            <div className="online-location-card">
              <div
                className={`online-card ${
                  activeLocation === "online" ? "active-card " : ""
                }`}
                onClick={() => setActiveLocation("online")}
              >
                <ion-icon name="globe-outline"></ion-icon>
                <h3>Online</h3>
                <p>Host virtual events,sharing access with ticket buyers.</p>
              </div>
            </div>
            <div className="record-location-card">
              <div
                className={`record-card ${
                  activeLocation === "record" ? "active-card " : ""
                }`}
                onClick={() => setActiveLocation("record")}
              >
                <ion-icon name="recording-outline"></ion-icon>
                <h3>Recorded Events</h3>
                <p>
                  Provide instant access to pre-recorded content after purchase.{" "}
                </p>
              </div>
            </div>
          </div>
          {activeLocation === "record" && (
            <div className="record-dropdown">
              <label>Where is your recorded event hosted?*</label>
              <div
                className={`youtube-card card ${
                  activeRecordSource === "youtube" ? "active-card" : ""
                }`}
                onClick={() => setActiveRecordSource("youtube")}
              >
                <ion-icon name="logo-youtube"></ion-icon>
                Youtube
              </div>

              <div
                className={`vimeo-card card ${
                  activeRecordSource === "vimeo" ? "active-card" : ""
                }`}
                onClick={() => setActiveRecordSource("vimeo")}
              >
                <ion-icon name="logo-vimeo"></ion-icon>
              </div>

              <div
                className={`others-card card ${
                  activeRecordSource === "others" ? "active-card" : ""
                }`}
                onClick={() => setActiveRecordSource("others")}
              >
                Others
              </div>
              {activeRecordSource === "youtube" && (
                <div className="youtube-dropdown">
                  <label>Link of the youtube video</label>
                  <input
                    type="text"
                    value={youtubeVideoLink}
                    onChange={(e) => setYoutubeVideoLink(e.target.value)}
                    placeholder="https://youtube.com/yourvideo"
                  />
                  <p>
                    People who register for your event will get instant access
                    to your video content
                  </p>
                </div>
              )}
              {activeRecordSource === "vimeo" && (
                <div className="vimeo-dropdown">
                  <label>Link of the vimeo video</label>
                  <input
                    type="text"
                    value={vimeoVideoLink}
                    onChange={(e) => setVimeoVideoLink(e.target.value)}
                    placeholder="ex. https://vimeo.com/yourvideo"
                  />
                  <p>
                    People who register for your event will get instant access
                    to your video content
                  </p>
                </div>
              )}
              {activeRecordSource === "others" && (
                <div className="others-dropdown">
                  <label>
                    Provide instruction to access your event content*
                  </label>
                  <textarea
                    name="other-event-access-info"
                    id="other-event-accss-info"
                    placeholder="Enter steps to access your event video"
                  ></textarea>
                  <p>
                    <ion-icon name="information-outline"></ion-icon>
                    These instructions would be shown to your audience once they
                    register for the event!
                  </p>
                </div>
              )}
            </div>
          )}
          {activeLocation === "venue" && (
            <div className="venue-dropdown">
              <label htmlFor="location">Location name*</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location Name"
                required
              />
              <textarea
                name="address"
                id="address"
                placeholder="Address"
              ></textarea>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                required
              />
            </div>
          )}

          <div className="date-time">
            <h1>Date and Time</h1>
            <p>Select the event data, time, and timezone.</p>
            <h3>Event Type*</h3>
            <div className="type-cards">
              <div
                className={`single-event ${
                  eventType === "single" ? "active-card show-dropdown" : ""
                }`}
                onClick={() => setEventType("single")}
              >
                Single Event
              </div>

              <div
                className={`recurring-event ${
                  eventType === "recurring" ? "active-card show-dropdown" : ""
                }`}
                onClick={() => setEventType("recurring")}
              >
                Recurring Event
              </div>
            </div>
          </div>
          {eventType === "single" && (
            <div className="single-event-dropdown">
              <div className="start-date">
                <h3>Start Date*</h3>
                <input type="date" name="date" id="date" />
              </div>
              <div className="start-time">
                <h3>Start Time*</h3>
                <input type="time" name="time" id="time" />
              </div>
            </div>
          )}
          {eventType === "recurring" && (
            <div className="recurring-event-dropdown">
              <div className="start-time">
                <h3>Start Time*</h3>
                <input type="time" name="date" id="date" />
              </div>
              <div className="end-time">
                <h3>End Time*</h3>
                <input type="time" name="time" id="time" />
              </div>
            </div>
          )}
          <div className="event-description">
            <h3>Event Description*</h3>
            <textarea name="description" id="description"></textarea>
          </div>
          <div className="organizer-page">
            <h3>Organizer Page</h3>
            {currentUser && (
              <div className="organizer-name">{currentUser.displayName}</div>
            )}
          </div>
          <button type="submit">Continue</button>
        </div>
      </div>
    </>
  );
}

export default CreateEvent;
