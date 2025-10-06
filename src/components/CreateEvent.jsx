import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firestore.js";
import { Link } from "react-router-dom";

function CreateEvent() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [addressVisibility, setAddressVisibility] = useState(false);
  const [cityVisibility, setCityVisibility] = useState(false);
  const [youtubeVideoLink, setYoutubeVideoLink] = useState("");
  const [vimeoVideoLink, setVimeoVideoLink] = useState("");
  const { currentUser, loading } = useAuth();
  const [activeLocation, setActiveLocation] = useState("");
  const [eventType, setEventType] = useState("single");
  const [activeRecordSource, setActiveRecordSource] = useState("youtube");
  const [userDoc, setUserDoc] = useState(null);
  const [loadingUserDoc, setLoadingUserDoc] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [startTime, setStartTime] = useState("00:00"); //
  const [endTime, setEndTime] = useState("00:00"); //

  // This code gets today's date and formats it as YYYY-MM-DD
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so we add 1
  const day = String(today.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  const [startDate, setStartDate] = useState(formattedDate); // Default is today's date
  const handleContinue = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert("You must be logged in to create an event.");
      return;
    }

    try {
      const eventData = {
        name,
        location,
        city,
        eventType,
        activeLocation,
        activeRecordSource,
        startDate,
        startTime,
        endTime,
        youtubeVideoLink,
        vimeoVideoLink,
        organizerName:
          currentUser.displayName || userDoc?.name || "Unknown Organizer",
        userId: currentUser.uid,
        createdAt: new Date(),
      };

      await addDoc(collection(db, "events"), eventData);

      setShowSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 2500);
    } catch (error) {
      // console.error(" error saving event:", error);
      alert("failed to create event. please try again.");
    }
  };

  useEffect(() => {
    if (!loading && !currentUser) {
      navigate("/");
    }
  }, [currentUser, loading, navigate]);
  useEffect(() => {
    const fetchUserDoc = async () => {
      if (currentUser) {
        try {
          setLoadingUserDoc(true);
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            setUserDoc(userDocSnap.data());
          } else {
            // console.log("No user document found!");
          }
        } catch (error) {
          //   console.error("Error fetching user document:", error);
        } finally {
          setLoadingUserDoc(false);
        }
      }
    };

    fetchUserDoc();
  }, [currentUser]);
  if (loading || loadingUserDoc) {
    return (
      <div>
        <div>Loading...</div>
      </div>
    );
  }
  const homepage = () => {
    navigate("/");
  };
  return (
    <>
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

      <div className="create-event-page">
        {showSuccess && (
          <div className="success-popup">
            Your event has been successfully created!
          </div>
        )}
        <div className="create-event-container">
          <div className="create-event-container-left">
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
            <p className="create-event-p">Where will your event take place? </p>
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
                    Provide instant access to pre-recorded content after
                    purchase.
                  </p>
                </div>
              </div>
            </div>
            {activeLocation === "record" && (
              <div className="record-dropdown">
                <label>Where is your recorded event hosted?*</label>
                <div className="card-row">
                  <div
                    className={`youtube-card card ${
                      activeRecordSource === "youtube" ? "active-card " : ""
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
                    Vimeo
                  </div>

                  <div
                    className={`others-card card ${
                      activeRecordSource === "others" ? "active-card" : ""
                    }`}
                    onClick={() => setActiveRecordSource("others")}
                  >
                    Others
                  </div>
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
                  <div className="vimeo-dropdown ">
                    <label>Link of the vimeo video</label>
                    <input
                      type="text"
                      value={vimeoVideoLink}
                      onChange={(e) => setVimeoVideoLink(e.target.value)}
                      placeholder="https://vimeo.com/yourvideo"
                    />
                    <p>
                      People who register for your event will get instant access
                      to your video content
                    </p>
                  </div>
                )}
                {activeRecordSource === "others" && (
                  <div className="others-dropdown ">
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
                      These instructions would be shown to your audience once
                      they register for the event!
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
                  onInput={(e) => {
                    setAddressVisibility(true), setCityVisibility(true);
                  }}
                  required
                />
                {addressVisibility && (
                  <textarea
                    name="address"
                    id="address"
                    placeholder="Address"
                  ></textarea>
                )}
                {cityVisibility && (
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    required
                  />
                )}
              </div>
            )}

            <div className="date-time">
              <h1>Date and Time</h1>
              <p>Select the event data, time, and timezone.</p>
              <h3>Event Type*</h3>
              <div className="type-cards  card card-row">
                <div
                  className={`single-event ${
                    eventType === "single" ? "active-card " : ""
                  }`}
                  onClick={() => setEventType("single")}
                >
                  Single Event
                </div>

                <div
                  className={`recurring-event ${
                    eventType === "recurring" ? "active-card " : ""
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
                  <input
                    type="date"
                    name="date"
                    id="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="start-time">
                  <h3>Start Time*</h3>
                  <input
                    type="time"
                    name="time"
                    id="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
              </div>
            )}
            {eventType === "recurring" && (
              <div className="recurring-event-dropdown">
                <div className="start-time">
                  <h3>Start Time*</h3>
                  <input type="time" name="date" id="date" value={startTime} onChange={(e)=>setStartTime(e.target.value)}/>
                </div>
                <div className="end-time">
                  <h3>End Time*</h3>
                  <input
                    type="time"
                    name="time"
                    id="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              </div>
            )}
            <div className="event-description">
              <h3>Event Description*</h3>
              <textarea name="description" id="description"></textarea>
            </div>
            <h3>Organizer Page</h3>
            <div className="organizer-page">
              {currentUser &&
                (currentUser.displayName ? (
                  <div className="organizer-name">
                    {currentUser.displayName}
                  </div>
                ) : (
                  <div className="organizer-name">{userDoc.name}</div>
                ))}
            </div>
            <button
              onClick={handleContinue}
              className="continue-button"
              type="submit"
            >
              Continue
            </button>
          </div>

          <div className="create-event-container-right">
            <div className="sidebar-card video-card">
              <div className="video-thumbnail"
              onClick={()=>window.open("https://youtu.be/Usa-fdfTV4U")}
              >
                <img
                  src="https://cdn2.allevents.in/transup/95/d4ec5e75c243fa960a00c472041cbd/Frame-30-1-.png"
                  alt="Video thumbnail"
                />
              </div>
              <h2>Here's a video to help you get started!</h2>
              <p>
                Check out this guide to learn how to make the most of AllEvents.
              </p>
            </div>
              <h2>Import your events from other platforms</h2>
              <p>
                Have you already published your events on other platforms like
                Facebook, Eventbrite or your own website?
              </p>
              <button className="import-button">Import now</button>

          </div>
        </div>
      </div>
    </>
  );
}

export default CreateEvent;
