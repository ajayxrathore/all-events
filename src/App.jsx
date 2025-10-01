import "./App.css";
import { useState } from "react";
import DownloadApp from "./components/DownloadApp";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroArtistList from "./components/HeroArtistList";
import HeroBanner from "./components/HeroBanner";
import HeroList from "./components/HeroList";
import Navbar from "./components/Navbar";
import Organizers from "./components/Organizers";
import SectionCard from "./components/SectionCard";
import SectionCard2 from "./components/SectionCard2";
import SectionCard3 from "./components/SectionCard3";
import SectionCard4 from "./components/SectionCard4";
import SectionCard5 from "./components/SectionCard5";
import SectionCard6 from "./components/SectionCard6";
function App() {
     const [showSignIn, setShowSignIn] = useState(false);
    const [createevent,setCreateEvent] = useState(false)
  const handleSignInClick = () => {
    setShowSignIn(true);
  };
  const handlecreateevent = ()=>{
    setCreateEvent(true)
  }
  if(createevent){
    return(
        <div>
        <h1>
            Create Event Page
        </h1>
        <button onClick={() => setCreateEvent(false)}>Back to home</button>
        </div>
    )
  }
  if (showSignIn) {
    return (
      <div className="signin-page">
        <h1>Sign In Page</h1>
        {/* Add your sign-in form here */}
        <button onClick={() => setShowSignIn(false)}>Back to Home</button>
      </div>
    );
  }
  return (
    <>
      <Header SignInButtonClicked={handleSignInClick} createEventButton = {handlecreateevent} />
      <div className="main-content">
        <Navbar />
        <HeroBanner/>
        <HeroList/>
        <HeroArtistList/>
        <SectionCard/>
        <SectionCard2/>
        <SectionCard3/>
        <Organizers/>
        <DownloadApp/>
        <SectionCard4/>
        <SectionCard5/>
        <SectionCard6/>
      </div>
        <Footer/>
    </>
  );
}
export default App;
