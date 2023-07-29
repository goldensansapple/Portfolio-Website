import  LinkButton  from "@/components/button/linkButton";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <div className="text-4xl font-extrabold p-4">404 Not Found</div>
      <LinkButton text="Go Back to Home" href="/" />
    </div>
  );
}
