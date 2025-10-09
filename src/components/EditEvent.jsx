import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firestore.js";
import { Link } from "react-router-dom";
import { useEventStore } from "../store/useEventStore.js";
function EditEvent() {
    const {
  eventData,
  setEventField
} = useEventStore();
  const navigate = useNavigate();
  const [addressVisibility, setAddressVisibility] = useState(false);
  const [cityVisibility, setCityVisibility] = useState(false);
  const { currentUser, loading } = useAuth();
  const [userDoc, setUserDoc] = useState(null);
  const [loadingUserDoc, setLoadingUserDoc] = useState(true);


 const { name, location, city, eventType, startDate, startTime, endTime, description,activeLocation, locationInstruction,activeRecordSource, youtubeVideoLink, vimeoVideoLink } = eventData;


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

  return (
    <>
      <div className="edit-event-wrapper create-event-page">
        <div className="create-event-container">
          <div className="create-event-container-left">
            <h1>Edit an Event</h1>
            <h2>Basic Info</h2>
            <h5>Name your event and tell event-goers why they should come. Add details that highlight what makes it unique.</h5>
            <label htmlFor="name">Event Name*</label>
            <input
              value={name}
              onChange={(e) => setEventField("name",e.target.value)}
              placeholder="Enter the Name of your event"
              required
            ></input>
            <div className="event-description">
              <h3>Event Description*</h3>
              <textarea name="description" id="description" value={description} onChange={(e)=>setEventField("description",e.target.value)}></textarea>
            </div>
            <h1>Location</h1>
            <p>Choose where your event will take place</p>
            <p className="create-event-p">Where will your event take place? </p>
            <div className="location-section">
              <div className="venue-location-card">
                <div
                  className={`venue-card ${
                    activeLocation === "venue" ? "active-card " : ""
                  }`}
                  onClick={() => setEventField("activeLocation","venue")}
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
                  onClick={() => setEventField("activeLocation","online")}
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
                  onClick={() => setEventField("activeLocation","record")}
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
                    onClick={() => setEventField("activeRecordSource","youtube")}
                  >
                    <ion-icon name="logo-youtube"></ion-icon>
                    Youtube
                  </div>

                  <div
                    className={`vimeo-card card ${
                      activeRecordSource === "vimeo" ? "active-card" : ""
                    }`}
                    onClick={() => setEventField("activeRecordSource","vimeo")}
                  >
                    <ion-icon name="logo-vimeo"></ion-icon>
                    Vimeo
                  </div>

                  <div
                    className={`others-card card ${
                      activeRecordSource === "others" ? "active-card" : ""
                    }`}
                    onClick={() => setEventField("activeRecordSource","others")}
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
                      onChange={(e) => setEventField("youtubeVideoLink",e.target.value)}
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
                      onChange={(e) => setEventField("vimeoVideoLink",e.target.value)}
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
                      value={locationInstruction}
                      onChange={(e)=>setEventField("locationInstruction",e.target.value)}
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
                  onChange={(e) => setEventField("location",e.target.value)}
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
                    value={address}
                    onChange={(e)=>setEventField("address",e.target.value)}
                  ></textarea>
                )}
                {cityVisibility && (
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setEventField("city",e.target.value)}
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
                  onClick={() => setEventField("eventType","single")}
                >
                  Single Event
                </div>

                <div
                  className={`recurring-event ${
                    eventType === "recurring" ? "active-card " : ""
                  }`}
                  onClick={() => setEventField("eventType","recurring")}
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
                    onChange={(e) => setEventField("startDate",e.target.value)}
                  />
                </div>
                <div className="start-time">
                  <h3>Start Time*</h3>
                  <input
                    type="time"
                    name="time"
                    id="time"
                    value={startTime}
                    onChange={(e) => setEventField("startTime",e.target.value)}
                  />
                </div>
              </div>
            )}
            {eventType === "recurring" && (
              <div className="recurring-event-dropdown">
                <div className="start-time">
                  <h3>Start Time*</h3>
                  <input type="time" name="date" id="date" value={startTime} onChange={(e)=>setEventField("startTime",e.target.value)}/>
                </div>
                <div className="end-time">
                  <h3>End Time*</h3>
                  <input
                    type="time"
                    name="time"
                    id="time"
                    value={endTime}
                    onChange={(e) => setEventField("endTime",e.target.value)}
                  />
                </div>
              </div>
            )}
            <button
            
              className="continue-button"
              type="submit"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditEvent;
