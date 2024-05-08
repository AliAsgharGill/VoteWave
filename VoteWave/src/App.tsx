import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// Layout Page
import Layout from "./Router/Layout/Layout";
// Component and Pages
import Home from "./Components/Home/Home";
import Campaigns from "./Components/Campaigns/Campaigns";
import Result from "./Components/Result/Result";
import NoMatch from "./Components/NoMatch/NoMatch";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import CampaignManagement from "./Components/Admin/campaignManagement/campaignManagement";
import User from "./Components/User/User";
import Dashboard from "./Components/Admin/Dashboard/Dashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index path="/" element={<Home />} />
      <Route path="/campaigns" element={<Campaigns />} />
      <Route path="/campaignsManagement" element={<CampaignManagement />} />
      <Route path="/result" element={<Result />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route index path="/user" element={<User />} />
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
      <RouterProvider router={router} />
  );
}

export default App;
