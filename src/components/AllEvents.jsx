import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firestore.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";


function AllEvents() {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  useEffect(() => {
    if (!loading && !currentUser) {
      navigate("/");
    }
  }, [currentUser, loading, navigate]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const allEvents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(allEvents);
      } catch (error) {
        // console.error("Error fetching events:", error);
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading || loadingEvents) {
    return (
      <div className="loading-container">
        <div>Loading events...</div>
      </div>
    );
  }

  return (
    <>
      <div className="events-page">
        <h1>Events for you</h1>

        {events.length === 0 ? (
          <p>No events found </p>
        ) : (
          <div className="events-grid">
            {events.map((event) => (
              <div key={event.id} className="event-card">
                {event.banner && (
                <img
                  src={event.banner}
                  alt={event.name || "Event banner"}
                  className="event-banner"
                />
              )}
                <h2>{event.name}</h2>
                <p>
                {event.description}
                </p>
                <p>
                  <strong>Location:</strong>{" "}
                  {event.activeLocation === "record"
                    ? "Recorded Event"
                    : event.location || "Online"}
                </p>
                {event.activeRecordSource === "youtube" &&
                  event.youtubeVideoLink && (
                    <a
                      href={event.youtubeVideoLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Watch on YouTube
                    </a>
                  )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default AllEvents;
