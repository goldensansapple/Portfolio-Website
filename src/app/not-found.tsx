export default function NotFound() {
    return (
      <div className="flex flex-col min-h-screen justify-center items-center">
        <div className="text-4xl font-extrabold p-4">404 Not found</div>
        <a className="border border-gray-300 rounded-lg p-1 hover:border-blue-500" href="/">Go back to home</a>
      </div>
    );
  }