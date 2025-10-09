import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import CreateEvent from "./components/CreateEvent.jsx";
import Home from "./components/Home.jsx";
import AllEvents from "./components/AllEvents.jsx";
import Event from "./components/Event.jsx";
import EventMedia from "./components/EventMedia.jsx";
import Tickets from "./components/Tickets.jsx";
import PublishEvent from "./components/PublishEvent.jsx";
import EditEvent from "./components/EditEvent.jsx";
import EventInfo from "./components/EventInfo.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "",
        element: <App />,
      },
    ],
  },
  {
    path:"/create-event",
    element:<CreateEvent/>
  },
  {
    path: "/event",
    element: <Event/>,
    children:[
        {
            path:"event-media",
            element:<EventMedia/>
        },
        {
            path:"tickets",
            element:<Tickets/>
        },
        {
            path:"publish-event",
            element:<PublishEvent/>
        },
        {
            path:"edit-event",
            element:<EditEvent/>
        }
    ]
  },
  {
    path:"/eventinfo/:id",
    element:<EventInfo/>
  },
  {
    path:"/all-events",
    element:<AllEvents/>
  }
]);
createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router}></RouterProvider>
  </AuthProvider>
);
