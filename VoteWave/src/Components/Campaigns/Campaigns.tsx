import React from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const Campaigns = () => {
  const navigate = useNavigate();
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const adminString = localStorage.getItem("admin");
  const admin = adminString ? JSON.parse(adminString) : null;

  React.useEffect(() => {
    if (!admin && !user) {
      message.warning("Please login to access! ");
      navigate("/login/user");
    }
  }, [admin, navigate, user]);

  return <>{!user || !admin ? <h1>Campaigns</h1> : null}</>;
};

export default Campaigns;
