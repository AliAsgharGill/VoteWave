import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// Layout Page

// Component and Pages
import Layout from "./Router/Layout/Layout";
import Home from "./Components/Home/Home";
import Campaigns from "./Components/Campaigns/Campaigns";
import Result from "./Components/Result/Result";
import NoMatch from "./Components/NoMatch/NoMatch";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index path="/" element={<Home />} />
      <Route path="/campaigns" element={<Campaigns />} />
      <Route path="/result" element={<Result />} />
      <Route path="*" element={<NoMatch />} />

      {/*Dynamic Routes for user */}
      <Route path="/signup/user" element={<Signup type="user" />} />
      <Route path="/login/user" element={<Login type="user" />} />

      {/*Dynamic Routes for admin */}
      <Route path="/signup/admin" element={<Signup type="admin" />} />
      <Route path="/login/admin" element={<Login type="admin" />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
