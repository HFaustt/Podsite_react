import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="w-full h-screen">
      <img
        src="/pageNotFound.jpg"
        alt="background image"
        className="w-full h-full object-cover opacity-50"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <h2 className="text-xl">404</h2>
        <h1 className="text-6xl mb-4">Page not found</h1>
        <p className="mb-4">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link to="/" className="text-md underline">
          <p>← Back to home</p>
        </Link>
      </div>
    </div>
  );
}
