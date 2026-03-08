import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (user) {
      navigate("/dashboard", { replace: true });
    } else {
      const localUser = localStorage.getItem("neet-user");
      navigate(localUser ? "/auth" : "/onboarding", { replace: true });
    }
  }, [user, loading, navigate]);

  return null;
};

export default Index;
