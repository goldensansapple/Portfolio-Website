import Image from "next/image";

export default function ImageLinkButton({
  text,
  href,
  src,
}: {
  text: string;
  href: string;
  src: string;
}) {
  return (
    <a
      className="border border-gray-300 bg-slate-50 rounded-lg p-1 hover:border-gray-800"
      href={href}
    >
      <Image src={src} alt={text} width={32} height={32} priority />
    </a>
  );
}
