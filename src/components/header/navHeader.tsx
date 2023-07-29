import Link from "next/link";

export default function NavHeader() {
  return (
    <header className="flex fixed w-full border-b border-gray-300 bg-slate-50 mb-2">
      <Link className="p-3 rounded-lg hover:bg-gray-200" href="/">
        Home
      </Link>
    </header>
  );
}
