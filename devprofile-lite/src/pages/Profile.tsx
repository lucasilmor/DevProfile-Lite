import { useEffect, useState } from "react";
import { auth, db } from "../services/firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { UserProfile } from "../types/UserProfile";

export default function Profile() {
  const [perfil, setPerfil] = useState<UserProfile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const docRef = doc(db, "userProfiles", user.uid);
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          setPerfil(docSnap.data() as UserProfile);
        } else {
          setPerfil({
            nomeCompleto: "",
            bioCurta: "Perfil ainda não configurado",
            linkPortfolio: "",
          });
        }
      });
    }
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold mb-4">Meu Perfil</h2>
      <div className="border p-4 rounded shadow-md w-full max-w-md bg-white">
        <p><strong>Nome:</strong> {perfil?.nomeCompleto}</p>
        <p><strong>Bio:</strong> {perfil?.bioCurta}</p>
        <p>
          <strong>Portfólio:</strong>{" "}
          {perfil?.linkPortfolio ? (
            <a
              href={perfil.linkPortfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {perfil.linkPortfolio}
            </a>
          ) : (
            <span className="text-gray-500">Não informado</span>
          )}
        </p>
      </div>
      <button onClick={handleLogout} className="mt-6 bg-red-500 text-white px-4 py-2 rounded">
        Sair
      </button>
    </div>
  );
}
