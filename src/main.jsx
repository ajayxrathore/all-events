import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
    path: "/create-event",
    element: <CreateEvent />,
  },{
    path:"/all-events",
    element:<AllEvents/>
  }
]);
import { AuthProvider } from "./context/AuthContext.jsx";
import CreateEvent from "./components/CreateEvent.jsx";
import Home from "./components/Home.jsx";
import AllEvents from "./components/AllEvents.jsx";
createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router}></RouterProvider>
  </AuthProvider>
);
