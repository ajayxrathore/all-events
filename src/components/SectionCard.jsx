

function SectionCard() {
  return (
    <div className="section-card-container">
      <div className="section-card-text">
        <h2>Tell us what you love</h2>
        <p>This will help us curate events specially for you</p>
        <div className="button-nav">
          <button>Business</button>
          <button>Music</button>
          <button>Comedy</button>
          <button>Parties</button>
          <button>Dance</button>
          <button>Dating</button>
          <button>Workshop</button>
          <button>Food & Drinks</button>
          <button>Sports</button>
          <button>Fine Arts</button>
          <button>Show More</button>
        </div>
        <button className="get-started">Get Started</button>
      </div>
      <div className="section-card-image">
        <img src="https://cdn2.allevents.in/transup/ea/2985757025446099f9a6f590ea373b/Searching-2--Streamline-Barcelona-1-.webp" alt="" />
      </div>
    </div>
  );
}

export default SectionCard;
