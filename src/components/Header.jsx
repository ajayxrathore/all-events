function Header() {
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
              <a className="create-event" href="#">
                <ion-icon name="add-outline"></ion-icon>
                Create Event
              </a>
              <button className="signin-button">
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
      <button className="mobile-menu-button">
        <ion-icon name="menu-outline"></ion-icon>
      </button>
          </div>
        </div>
      </div>


  );
}

export default Header;
