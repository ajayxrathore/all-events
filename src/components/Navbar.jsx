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
        </li>
        <li className="drop-items">
          <a href="#">Art & Theatre</a>
          <ion-icon name="chevron-down"></ion-icon>
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
        </li>
      </ul>

    </nav>
  );
}

export default Navbar;
