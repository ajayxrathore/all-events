import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firestore.js";
import { useEffect, useState } from "react";


function EventInfo() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const docRef = doc(db, "events", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setEvent(docSnap.data());
        } else {
          console.error("No event found");
        }
      } catch (err) {
        console.error("Error fetching event:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return <div className="loading-container">Loading event...</div>;
  }

  if (!event) {
    return <div className="error-message">Event not found</div>;
  }

  const organizerName =
    event.username

  return (
    <div className="event-info-page">

      {event.banner && (
        <div className="event-banner-container">
          <img src={event.banner} alt={event.name} className="event-info-banner" />
        </div>
      )}


      <div className="event-header">
        <h1 className="event-title">{event.name}</h1>
        <p className="event-organizer">Organized by {organizerName}</p>
      </div>


      <div className="event-details-section">
        <h3 className="event-subheading">Date & Time</h3>
        <p>
          {event.startDate
            ? `${event.startDate} ${event.startTime ? "at " + event.startTime : ""}`
            : "Date not specified"}
        </p>

        <h3 className="event-subheading">Location</h3>
        <p>
          {event.activeLocation === "record"
            ? "Recorded Event"
            : event.location || "Online"}
        </p>
      </div>


      <div className="event-description-section">
        <h3 className="event-subheading">Event Description</h3>
        <p>{event.description || "No description provided."}</p>
      </div>


      {event.tickets && event.tickets.length > 0 && (
        <div className="event-tickets-section">
          <h3 className="event-subheading">Tickets</h3>
          <table className="tickets-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Name</th>
                <th>Price</th>
                <th>Available</th>
              </tr>
            </thead>
            <tbody>
              {event.tickets.map((t, i) => (
                <tr key={i}>
                  <td>{t.type}</td>
                  <td>{t.ticketName}</td>
                  <td>{t.type === "Free" ? "Free" : `$${t.price}`}</td>
                  <td>{t.numberOfTickets || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default EventInfo;
