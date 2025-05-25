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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 md:p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-1">Meu Perfil</h2>
          <p className="text-sm text-gray-500">Informações vinculadas ao seu cadastro</p>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-gray-700 font-medium">Nome:</p>
            <p className="text-gray-900">{perfil?.nomeCompleto || "Não informado"}</p>
          </div>

          <div>
            <p className="text-gray-700 font-medium">Bio:</p>
            <p className="text-gray-900">{perfil?.bioCurta || "Sem descrição."}</p>
          </div>

          <div>
            <p className="text-gray-700 font-medium">Portfólio:</p>
            {perfil?.linkPortfolio ? (
              <a
                href={perfil.linkPortfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline break-words"
              >
                {perfil.linkPortfolio}
              </a>
            ) : (
              <p className="text-gray-500">Não informado</p>
            )}
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition duration-200"
        >
          Sair
        </button>
      </div>
    </div>
  );
}
