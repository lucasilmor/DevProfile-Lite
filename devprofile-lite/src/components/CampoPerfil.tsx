export default function CampoPerfil({
  label,
  valor,
}: {
  label: string;
  valor?: string;
}) {
  return (
    <div>
      <p className="text-gray-700 font-medium">{label}:</p>
      <p className="text-gray-900">{valor || "Não informado"}</p>
    </div>
  );
}
