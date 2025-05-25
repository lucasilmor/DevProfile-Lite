import { useState } from "react";
import { auth } from "../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      navigate("/");
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        setErro("Este email já está em uso.");
      } else if (err.code === "auth/invalid-email") {
        setErro("Email inválido.");
      } else if (err.code === "auth/weak-password") {
        setErro("A senha deve ter pelo menos 6 caracteres.");
      } else {
        setErro("Erro ao cadastrar. Verifique os dados.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 md:p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-green-600 mb-1">Cadastro</h2>
          <p className="text-sm text-gray-500">Crie uma conta para acessar seu perfil</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-300"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-green-300"
            required
          />
          {erro && <p className="text-red-500 text-sm">{erro}</p>}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition duration-200"
          >
            Cadastrar
          </button>
        </form>

        <p className="text-sm text-center text-gray-500">
          Já tem uma conta?{" "}
          <Link to="/login" className="text-green-600 hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
