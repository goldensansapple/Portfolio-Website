"use client";

import  LinkButton  from "@/components/button/linkButton";

export default function Error() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <div className="text-4xl font-extrabold">Unexpected Server Error Occurred</div>
      <LinkButton text="Go Back to Home" href="/" />
    </div>
  );
}