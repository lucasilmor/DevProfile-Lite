import { useState } from "react";
import { auth } from "../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

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
    } catch (err) {
        console.log(err);
      setErro("Erro ao cadastrar. Verifique os dados.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-2xl mb-4">Cadastro</h2>
      <form onSubmit={handleRegister} className="flex flex-col gap-2 w-80">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-2"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          className="border p-2"
          required
        />
        {erro && <p className="text-red-500">{erro}</p>}
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Cadastrar
        </button>
      </form>
    </div>
  );
}
