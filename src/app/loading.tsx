import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <Image src="/loading.gif" alt="Loading symbol" />
    </div>
  );
}
