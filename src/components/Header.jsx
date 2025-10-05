import { useEffect, useState } from "react";
import { auth } from "../firebase/auth.js";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firestore.js";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { useAuth } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Header({ showSearch = true }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const googleProvider = new GoogleAuthProvider();
  const { currentUser } = useAuth();
  const navigate = useNavigate()
  const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };
  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        // console.log("checking redirect");
        const result = await getRedirectResult(auth);
        // console.log("redirect result:", result);
        // console.log({ currentUser });

        if (result) {
          const user = result.user;
        //   console.log("User signed in with Google redirect");
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (!userDoc.exists()) {
            await setDoc(userDocRef, {
              uid: user.uid,
              name: user.displayName,
              email: user.email,
              createdAt: new Date(),
            });
            // console.log("user doc created in firestore");
          } else {
            // console.log("user already exists in firestore.");
          }
          setShowSignInModal(false);
        }
      } catch (error) {
        // console.error("Error handling redirect result:", error);
      }
    };

    handleRedirectResult();
  }, []);
  const homepage = ()=>{
    navigate('/')
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      try {
        const loggedinUser = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        setShowEmailModal(false);
        if (loggedinUser) {
          setEmail("");
          setPassword("");
          return;
        }
      } catch {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        //   console.log("User created successfully:");
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name: name,
          email: user.email,
          createdAt: new Date(),
        });
        setShowEmailModal(false);
      }
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      //   console.error("Error creating user:", error);
      setName("");
      setEmail("");
      setPassword("");
    }
  };
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setShowEmailModal(false);
      setShowSignInModal(false);
      setIsMobileMenuOpen(false);
    } catch (error) {
      //   console.error("Error signing out: ", error);
    }
  };

  const handleMobileMenuClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignInClick = () => {
    setShowSignInModal(true);
  };

  const handleSignInFromMobile = () => {
    setIsMobileMenuOpen(false);
    setShowSignInModal(true);
  };

//   const handleCreateEventFromMobile = () => {
//     setIsMobileMenuOpen(false);
//   };

  const handleGoogleSignIn = async () => {
    try {
      if (isMobileDevice()) {

        await signInWithRedirect(auth, googleProvider);
      } else {
        const userCredential = await signInWithPopup(auth, googleProvider);
        const user = userCredential.user;
        // console.log("User signed in with Google");
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          await setDoc(userDocRef, {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            createdAt: new Date(),
          });
          //   console.log("user doc created in firestore");
          setShowSignInModal(false);
        } else {
          //   console.log("user already exists in firestore.");
          setShowSignInModal(false);
        }
      }
    } catch {
    //   console.error("Error Signining with google");
    }
  };

  const handleEmailSignIn = () => {
    setShowSignInModal(false);
    setShowEmailModal(true);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // console.log("Email sign-in submitted");
  };

  return (
    <div className="topbar">
      <div className="top-container">
        <div className="left-topbar">
          <div className="logo-wrapper">
            <img
              className="alleventslogo"
              src="https://cdn2.allevents.in/media-kit/svg/ae-logo-vector.svg"
              alt="AllEvents"
              onClick={homepage}
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
          {showSearch && (
            <div className="search-bar">
              <ion-icon name="search-outline"></ion-icon>
              <input type="text" placeholder="Search events..." />
            </div>
          )}
          <div className="right-topbar-right">
            {!currentUser ? (
              <div
                className="create-event"
                onClick={(e) => setShowSignInModal(true)}
              >
                <ion-icon name="add-outline"></ion-icon>
                Create Event
              </div>
            ) : (
              <Link to="/create-event" className="create-event">
                <ion-icon name="add-outline"></ion-icon>
                Create Event
              </Link>
            )}
             {!currentUser ? (
              <div
                className="create-event"
                onClick={(e) => setShowSignInModal(true)}
              >
                <ion-icon name="sparkles-outline"></ion-icon>
                All Events
              </div>
            ) : (
              <Link to="/all-events" className="create-event">
                <ion-icon name="sparkles-outline"></ion-icon>
                All Events
              </Link>
            )}

            {!currentUser ? (
              <button onClick={handleSignInClick} className="signin-button">
                <ion-icon name="person-circle"></ion-icon>
                Sign in
              </button>
            ) : (
              <button onClick={handleSignOut} className="signin-button">
                <ion-icon name="log-out-outline"></ion-icon>
                Sign out
              </button>
            )}
          </div>

          <button className="open-app-button">Open App</button>
          <button className="mobile-search-button">
            <ion-icon name="search-outline"></ion-icon>
          </button>
          <button
            onClick={handleMobileMenuClick}
            className="mobile-menu-button"
          >
            <ion-icon name="menu-outline"></ion-icon>
          </button>
        </div>
      </div>

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
              {!currentUser ? (
                <button
                  className="mobile-menu-option"
                  onClick={handleSignInFromMobile}
                >
                  <ion-icon name="person-circle-outline"></ion-icon>
                  Login
                </button>
              ) : (
                <button className="mobile-menu-option" onClick={handleSignOut}>
                  <ion-icon name="log-out-outline"></ion-icon>
                  Logout
                </button>
              )}
              <div className="upper-mobile-section">
                <h4>Host Control</h4>
                {!currentUser ? (
                  <div
                    className="mobile-menu-option"
                    onClick={(e) => setShowSignInModal(true)}
                  >
                    <ion-icon name="add-outline"></ion-icon>
                    Create Event
                  </div>
                ) : (
                  <Link to="/create-event" className="mobile-menu-option">
                    <ion-icon name="add-outline"></ion-icon>
                    Create Event
                  </Link>
                )}
                <Link to='/all-events' className="mobile-menu-option" >
                  <ion-icon name="calendar-outline"></ion-icon>
                  Manage events
                </Link>
              </div>

              <button className="mobile-menu-option">
                <ion-icon name="cloud-download-outline"></ion-icon>
                Get the AllEventsApp
              </button>

              <button className="mobile-menu-option">
                <ion-icon name="help-circle-outline"></ion-icon>
                Need help?
              </button>
            </div>
          </div>
          <div
            className="mobile-menu-backdrop"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
        </div>
      )}
      {showSignInModal && (
        <div className="modal-overlay">
          <div className="signin-modal">
            <button
              className="modal-close-button"
              onClick={() => setShowSignInModal(false)}
            >
              <ion-icon name="close-outline"></ion-icon>
            </button>

            <div className="modal-header">
              <h2>Join AllEvents</h2>
              <p>Get event recommendations based on your interests</p>
            </div>

            <div className="social-buttons">
              <button
                className="social-button google"
                onClick={handleGoogleSignIn}
              >
                <ion-icon name="logo-google"></ion-icon>
                Continue with Google
              </button>

              <button
                className="social-button email"
                onClick={handleEmailSignIn}
              >
                <ion-icon name="mail-outline"></ion-icon>
                Continue with Email
              </button>
            </div>

            <div className="terms-text">
              By signing in, you agree to our Terms of Service and Privacy
              Policy.
            </div>
          </div>

          <div
            className="modal-backdrop"
            onClick={() => setShowSignInModal(false)}
          ></div>
        </div>
      )}
      {showEmailModal && (
        <div className="modal-overlay">
          <div className="signin-modal">
            <button
              className="modal-close-button"
              onClick={() => setShowEmailModal(false)}
            >
              <ion-icon name="close-outline"></ion-icon>
            </button>

            <div className="modal-header">
              <h2>Continue with Email</h2>
              <p>Enter your email to get started</p>
            </div>

            <form className="email-form" onSubmit={handleEmailSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                onClick={handleSubmit}
                type="submit"
                className="continue-button"
              >
                Continue
              </button>
            </form>

            <div className="terms-text">
              By continuing, you agree to our Terms of Service and Privacy
              Policy.
            </div>
          </div>

          <div
            className="modal-backdrop"
            onClick={() => setShowEmailModal(false)}
          ></div>
        </div>
      )}
    </div>
  );
}

export default Header;
