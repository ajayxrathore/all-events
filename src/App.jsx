import "./App.css";
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
  return (
    <>
      <Header />
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
