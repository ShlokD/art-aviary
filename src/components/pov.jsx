import { Link } from "preact-router";

const POV = () => {
  return (
    <div
      className="flex flex-col w-full items-center justify-center gap-4"
      style={{
        height: "33vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundOrigin: "center center",
        backgroundImage:
          "url(https://images.pexels.com/photos/460736/pexels-photo-460736.jpeg?auto=compress&cs=tinysrgb&w=1920)",
      }}>
      <Link href="/">
        <h1 className="font-bold text-5xl text-white p-4 bg-red-600 shadow bg-opacity-90 rounded-2xl shadow-md shadow-red-400">
          Art Aviary
        </h1>
      </Link>
    </div>
  );
};

export default POV;
