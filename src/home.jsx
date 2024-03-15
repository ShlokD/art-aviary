import { Link } from "preact-router";
import { useAppContext } from "./app-context";
import Spinner from "./components/spinner";

const MoreButton = () => {
  const { page, setPage, loading } = useAppContext();
  if (loading) {
    return null;
  }
  const nextPage = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setPage((prev) => prev + 1);
  };
  const prevPage = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setPage((prev) => prev - 1);
  };
  return (
    <div className="flex gap-1 lg:w-1/3 self-center">
      <button
        onClick={prevPage}
        disabled={page === 1}
        className={`${
          page === 1 ? "bg-gray-500" : "bg-red-500 hover:bg-red-600"
        } p-2 w-1/2 rounded-lg text-center text-xl font-bold text-white`}>
        Prev
      </button>
      <button
        onClick={nextPage}
        disabled={page === 100}
        className={`${
          page === 100 ? "bg-gray-500" : "bg-red-500 hover:bg-red-600"
        } p-2 w-1/2 rounded-lg text-center text-xl font-bold text-white`}>
        Next
      </button>
    </div>
  );
};

const Home = () => {
  const { loading, artworks } = useAppContext();

  return (
    <div className="flex flex-col gap-2">
      <MoreButton />
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          {artworks.map((artwork, i) => {
            return (
              <Link
                className="w-full flex flex-col shadow-lg rounded-lg h-auto items-center justify-center text-center"
                href={`/art?id=${artwork.id}`}
                style={{
                  backgroundImage: `url(${artwork.image})`,
                  minHeight: "200px",
                  backgroundSize: "cover",
                }}>
                <div className="bg-red-600 p-2 rounded-xl bg-opacity-80 w-1/2">
                  <p className="text-xl font-bold text-white truncate">
                    {artwork.artist}
                  </p>

                  <p className="text-sm italic font-bold text-white">
                    {artwork.title}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
      <MoreButton />
    </div>
  );
};

export default Home;
