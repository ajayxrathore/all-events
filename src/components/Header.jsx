import { useState } from "react";

function Header({SignInButtonClicked, createEventButton}) {
      const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
       const handleMobileMenuClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
   const handleSignInFromMobile = () => {
    setIsMobileMenuOpen(false);
    SignInButtonClicked();
  };
   const handleCreateEventFromMobile = () => {
    setIsMobileMenuOpen(false);
    createEventButton();
  };
    return (
      <div className="topbar">
        <div className="top-container">
          <div className="left-topbar">
            <div className="logo-wrapper">
              <img
                className="alleventslogo"
                src="https://cdn2.allevents.in/media-kit/svg/ae-logo-vector.svg"
                alt=""
                srcset=""
              />
              <span className="topbar-span">|</span>
            </div>

            <button className="topbar-button">
              <ion-icon name="location-outline"></ion-icon>
              Jaipur
              <ion-icon name="chevron-down-outline"></ion-icon>
            </button>
          </div>

          <div className="right-topbar">
            <div className="search-bar">
              <ion-icon name="search-outline"></ion-icon>
              <input type="text" />
            </div>
            <div className="right-topbar-right">
              <a onClick={createEventButton} className="create-event" href="#">
                <ion-icon name="add-outline"></ion-icon>
                Create Event
              </a>
              <button onClick={SignInButtonClicked} className="signin-button">
                <ion-icon name="person-circle"></ion-icon>
                Sign in
              </button>
            </div>
             <button className="open-app-button">
        Open App
      </button>
      <button className="mobile-search-button">
        <ion-icon name="search-outline"></ion-icon>
      </button>
      <button onClick={handleMobileMenuClick} className="mobile-menu-button">
        <ion-icon name="menu-outline"></ion-icon>
      </button>
          </div>
        </div>
         {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu-card">
            <div className="mobile-menu-header">
              <h3>AllEvents</h3>
              <button
                className="close-menu-button"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ion-icon name="close-outline"></ion-icon>
              </button>
            </div>

            <div className="mobile-menu-options">
                <button className="mobile-menu-option">
                <ion-icon name="location-outline"></ion-icon>
                    Jaipur
                </button>
              <button
                className="mobile-menu-option"
                onClick={handleSignInFromMobile}
              >
                <ion-icon name="person-circle-outline"></ion-icon>
                Login
              </button>
              <div className="upper-mobile-section">


              <h4>Host Control</h4>
              <button
                className="mobile-menu-option"
                onClick={handleCreateEventFromMobile}
              >
                <ion-icon name="add-circle-outline"></ion-icon>
                Create an event
              </button>

              <button className="mobile-menu-option">
                <ion-icon name="calendar-outline"></ion-icon>
                Manage events
              </button>
              </div>

              <button className="mobile-menu-option">
                <ion-icon name="heart-outline"></ion-icon>
               Get the AllEventsApp
              </button>

              <button className="mobile-menu-option">
                <ion-icon name="settings-outline"></ion-icon>
                Need help?
              </button>
            </div>
          </div>

          {/* Backdrop to close menu when clicking outside */}
          <div
            className="mobile-menu-backdrop"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
        </div>
      )}
      </div>


  );
}

export default Header;
