import React from "react";
import { Link } from "react-router-dom";
import { useEventStore } from "../store/useEventStore";
import { useState } from "react";
function Tickets() {
  const { addTicket, eventData } = useEventStore();
  const { tickets } = eventData;
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeType, setActiveType] = useState(null);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);
  const [ticketName, setTicketName] = useState("");
  const [numberOfTickets, setNumberOfTickets] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [instruction, setInstruction] = useState("");
  const [salesStart, setSalesStart] = useState("");
  const [salesEnd, setSalesEnd] = useState("");
  const [minPerTxn, setMinPerTxn] = useState("");
  const [maxPerTxn, setMaxPerTxn] = useState("");
  const [groupName, setGroupName] = useState("");
  const handlePanelClick = (e) => {
    e.stopPropagation();
  };

  const handleSaveTicket = () => {
    const newTicket = {
      type: activeType || "",
      ticketName: ticketName || "",
      numberOfTickets: numberOfTickets || "",
      price: price || "",
      description: description || "",
      instruction: instruction || "",
      salesStart: salesStart || "",
      salesEnd: salesEnd || "",
      available: true,
      ticketsPerTransaction: {
        min: minPerTxn || "",
        max: maxPerTxn || "",
      },
      groupName: groupName || "",
    };

    addTicket(newTicket);
    closeSidebar();
  };

  const renderSidebar = () => {
    return (
      <div className="sidebar-overlay" onClick={closeSidebar}>
        <div className="sidebar-panel" onClick={handlePanelClick}>
          <div className="sidebar-header">
            <div>
              <h2 className="sidebar-title">Create new tickets</h2>
              <p className="sidebar-subtitle">Add or edit tickets</p>
            </div>
            <button className="close-button" onClick={closeSidebar}>
              &times;
            </button>
          </div>

          <div className="sidebar-content">
            <label className="input-label">Select ticket*</label>
            <div className="ticket-type-selector">
              {["Paid", "Free", "Donation"].map((type) => (
                <button
                  key={type}
                  className={`ticket-type-button card ${
                    activeType === type ? "active-card" : ""
                  }`}
                  onClick={() => setActiveType(type)}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="form-group">
              <div className="label-container">
                <label className="input-label">Ticket name*</label>
                <span className="char-count">{ticketName.length}/60</span>
              </div>
              <input
                type="text"
                className="form-input"
                placeholder="Ex. Early bird, VIP, Gold, Silver etc."
                value={ticketName}
                onChange={(e) => setTicketName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="input-label">
                Number of ticket(s) on sale*
              </label>
              <input
                type="number"
                className="form-input"
                placeholder="Number of ticket(s) on sale"
                value={numberOfTickets}
                onChange={(e) => setNumberOfTickets(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="input-label">Ticket price*</label>
              <div className="input-group">
                <select className="currency-select">
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                </select>
                <input
                  type="number"
                  className="form-input price-input"
                  placeholder="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <div className="label-container">
                <label className="input-label">Ticket description</label>
                <span className="char-count">{description.length}/500</span>
              </div>
              <textarea
                className="form-textarea"
                placeholder="Type your description here"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="more-options-section">
              <div
                className="more-options-header"
                onClick={() => setShowMoreOptions(!showMoreOptions)}
              >
                <div>
                  <h3 className="more-options-title">More options</h3>
                  <p className="more-options-subtitle">
                    Add instruction, set sales period, limits, etc.
                  </p>
                </div>
                <span
                  className={`chevron ${showMoreOptions ? "up" : "down"}`}
                ></span>
              </div>

              {showMoreOptions && (
                <div className="more-options-content">
                  <div className="form-group">
                    <label className="input-label">
                      Additional instruction
                    </label>
                    <textarea
                      className="form-textarea"
                      placeholder="Type your instruction here"
                      rows="4"
                      value={instruction}
                      onChange={(e) => setInstruction(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="input-label">Ticket sales start</label>
                      <input
                        type="date"
                        className="form-input"
                        value={salesStart}
                        onChange={(e) => setSalesStart(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="input-label">Ticket sales end</label>
                      <input
                        type="date"
                        className="form-input"
                        value={salesEnd}
                        onChange={(e) => setSalesEnd(e.target.value)}
                      />
                    </div>
                  </div>

                  <label className="input-label">
                    Number of tickets allowed per transaction
                  </label>
                  <div className="form-row">
                    <div className="form-group">
                      <input
                        type="number"
                        className="form-input"
                        placeholder="Min"
                        value={minPerTxn}
                        onChange={(e) => setMinPerTxn(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="number"
                        className="form-input"
                        placeholder="Max"
                        value={maxPerTxn}
                        onChange={(e) => setMaxPerTxn(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="input-label">Ticket group name</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Ex. Season passes, Daily passes etc."
                      value={groupName}
                      onChange={(e) => setGroupName(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="sidebar-footer">
            <button className="reset-button">Reset</button>
            <button className="save-button" onClick={handleSaveTicket}>
              Save
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="tickets-page-container">
        <div className="tickets-header">
          <div className="header-content">
            <h1 className="section-title">Add Tickets</h1>
            <p className="section-description">
              Adding tickets to your event increases its visibility in AllEvents
              marketing campaigns.
            </p>
          </div>
          <button className="add-tickets-button-header" onClick={openSidebar}>
            Add tickets
          </button>
        </div>

        {tickets.length === 0 ? (<>
          <div className="feature-cards-container">
            <div className="feature-card">
              <span className="card-icon">⭐</span>
              <h3 className="card-title">
                Top rankings & better visibility on search engines
              </h3>
            </div>
            <div className="feature-card">
              <span className="card-icon">⚡</span>
              <h3 className="card-title">
                Instant & direct payments to your account
              </h3>
            </div>
            <div className="feature-card">
              <span className="card-icon">🔔</span>
              <h3 className="card-title">
                Booking reminders for incomplete transactions
              </h3>
            </div>
          </div>
          <button className="add-ticket-button-main" onClick={openSidebar}>
          + Add Ticket
        </button>
          </>
        ) : (
          <div className="tickets-table-container">
            <table className="tickets-table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Ticket Name</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th>Ticket on Sale</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket, index) => (
                  <tr key={ticket.id}>
                    <td>{index + 1}</td>
                    <td>{ticket.ticketName}</td>
                    <td>{ticket.type}</td>
                    <td>
                      {ticket.type === "Free" ? "Free" : `$${ticket.price}`}
                    </td>
                    <td>{ticket.numberOfTickets}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="or-divider"></p>
        <div className="external-link-section">
          <label htmlFor="ticketing-link" className="input-label">
            Link to your ticketing website
          </label>
          <input
            id="ticketing-link"
            type="text"
            className="link-input"
            placeholder="Link of your website or external ticketing platform"
          />
        </div>

        <div className="navigation-container">
          <Link to="/event/publish-event">
            <button className="next-button">Next</button>
          </Link>
        </div>
      </div>

      {isSidebarOpen && renderSidebar()}
    </>
  );
}

export default Tickets;
