import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("neet-user");
    navigate(user ? "/dashboard" : "/onboarding");
  }, [navigate]);

  return null;
};

export default Index;
