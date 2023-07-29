export default function Button({
  onClick,
  text,
}: {
  onClick: () => void;
  text: string;
}) {
  return (
    <button
      className="border border-gray-300 bg-slate-50 rounded-lg m-1 p-1 hover:border-gray-800"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
