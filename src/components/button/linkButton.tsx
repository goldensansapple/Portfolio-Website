export default function LinkButton({ text, href }: { text: string; href: string }) {
  return (
    <a
      className="border border-gray-300 bg-slate-50 rounded-lg p-1 hover:border-gray-800"
      href={href}
    >
      {text}
    </a>
  );
}
