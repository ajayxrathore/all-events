function Navbar() {
  return (
    <nav className="container">
      <ul className="navbar">
        <li>
          <a href="#">All</a>
        </li>
        <li className="drop-items">
          <a href="#">Entertainment</a>
          <ion-icon name="chevron-down"></ion-icon>
          <div className="dropdown-menu">
            <a href="#">Music Concerts</a>
            <a href="#">Concerts</a>
            <a href="#">Parties & Nightlife</a>
            <a href="#">Performance</a>
            <a href="#">Comedy</a>
            <a href="#">Dance</a>
          </div>
        </li>
        <li className="drop-items">
          <a href="#">Art & Theatre</a>
          <ion-icon name="chevron-down"></ion-icon>
           <div className="dropdown-menu">
            <a href="#">Fine Arts</a>
            <a href="#">Theatre</a>
            <a href="#">Literary Arts</a>
            <a href="#">Crafts</a>
            <a href="#">Photography</a>
            <a href="#">Cooking</a>
          </div>
        </li>
        <li>
          <a href="#">Food & Drinks</a>
        </li>
        <li>
          <a href="#">Business</a>
        </li>
        <li>
          <a href="#">Festivals</a>
        </li>
        <li>
          <a href="#">Today</a>
        </li>
        <li>
          <a href="#">This Weekend</a>
        </li>
        <li>
          <a href="#">Navratri</a>
        </li>
        <li className="drop-items">
          <a href="#">More</a>
          <ion-icon name="chevron-down"></ion-icon>
          <div className="dropdown-menu">
            <a href="#">Sports</a>
            <a href="#">Exhibition</a>
            <a href="#">Fashion</a>
            <a href="#">Wellness</a>
            <a href="#">Yoga</a>
            <a href="#">Kids</a>
            <a href="#">Workshops</a>
            <a href="#">Webinar</a>
          </div>
        </li>
      </ul>

    </nav>
  );
}

export default Navbar;
