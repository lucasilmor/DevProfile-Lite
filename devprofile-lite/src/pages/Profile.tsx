import { useEffect, useState } from "react";
import { auth, db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { UserProfile } from "../types/UserProfile";
import Navbar from "../components/Navbar";
import CampoPerfil from "../components/CampoPerfil";

export default function Profile() {
  const [perfil, setPerfil] = useState<UserProfile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const buscarPerfil = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const docRef = doc(db, "userProfiles", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPerfil(docSnap.data() as UserProfile);
        } else {
          setPerfil({
            nomeCompleto: "",
            bioCurta: "Perfil ainda não configurado",
            linkPortfolio: "",
          });
        }
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
      }
    };

    buscarPerfil();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 md:p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-blue-600 mb-1">Meu Perfil</h2>
            <p className="text-sm text-gray-500">Informações vinculadas ao seu cadastro</p>
          </div>

          <div className="space-y-4">
            <CampoPerfil label="Nome" valor={perfil?.nomeCompleto} />
            <CampoPerfil label="Bio" valor={perfil?.bioCurta} />
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
        </div>
      </div>
    </div>
  );
}
