import { useState } from "react";
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import FormInput from "../components/FormInput";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate("/profile");
    } catch (err) {
      setErro("Email ou senha incorretos.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 md:p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-1">Entrar</h2>
          <p className="text-sm text-gray-500">Acesse sua conta para ver seu perfil</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <FormInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          {erro && <p className="text-red-500 text-sm">{erro}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200"
          >
            Entrar
          </button>
        </form>

        <p className="text-sm text-center text-gray-500">
          Não tem uma conta?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Faça seu cadastro
          </Link>
        </p>
      </div>
    </div>
  );
}
