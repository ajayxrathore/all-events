import React from 'react';
import { NavLink } from 'react-router-dom';

import { useEventStore } from '../store/useEventStore';
const EventSidebar = () => {
  const {
  eventData
} = useEventStore();
  const navItems = [
    { name: 'Basic Info', path: '/event/edit-event' },
    { name: 'Media', path: '/event/event-media' },
    { name: 'Tickets', path: '/event/tickets' },
    { name: 'Publish', path: '/event/publish-event' },
  ];

  return (
    <aside className="event-sidebar">
 <div key={eventData.id} className="sidebar-event-card">
                {eventData.banner && (
                <img
                  src={eventData.banner}
                  alt={eventData.name || "Event banner"}
                  className="sidebar-event-banner"
                />
              )}
                <h2>{eventData.name}</h2>
                <p>
                {eventData.description}
                </p>
      </div>
      <nav className="sidebar-nav">
        <div className="nav-section-header">
          <span>Edit event</span>
        </div>
        <ul className="nav-list">
          {navItems.map((item) => (
            <li key={item.name} className="nav-item">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <span className="nav-icon"></span>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default EventSidebar;
