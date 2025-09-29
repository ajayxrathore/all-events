

function HeroBanner() {
  return (
    <div className="hero-banner">
      <div className="hero-content">
        <div className="text-container">
          <h1>
            All Events in <span>Jaipur</span>
          </h1>
          <p>
            Your eyes cannot see enough of the beauty of the pink city of India.
            Jaipur has its flair and charm, which boosts its heritage worldwide.
            Events in Jaipur are diverse, beautiful, and aesthetically pleasing
            at any time of the year. Festivals and events in Jaipur, like the
            Jaipur Literature Festival and International Film Festival, are the
            heart and soul of the festivals. Explore the events in Jaipur with
            us today!
          </p>
          <button className="join-community-button">
            Join the community
            <span className="arrow-icon">
              <ion-icon name="add-circle"></ion-icon>
            </span>
          </button>
        </div>
        <div className="image-container"></div>
      </div>
    </div>
  );
}

export default HeroBanner;
