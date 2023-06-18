import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Image className="dark:invert" src="/loading.gif" alt="Loading symbol" />
    </div>
  );
}
