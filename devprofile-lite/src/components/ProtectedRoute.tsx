import { JSX, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return <p className="text-center mt-20">Carregando...</p>;
  }

  return children;
}
