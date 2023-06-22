import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <Image src="/loading.svg" width="200" height="200" alt="Loading symbol" />
    </div>
  );
}
