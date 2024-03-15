import { Link } from "preact-router";
import { useState } from "preact/hooks";
import { useAppContext } from "./app-context";
import Spinner from "./components/spinner";

const Artwork = () => {
  const [zoom, setZoom] = useState(1);
  const [origin, setOrigin] = useState(null);

  const { artworks, loading } = useAppContext();
  const search = new URLSearchParams(window.location.search);
  const id = Number(search.get("id"));
  if (loading) {
    return <Spinner />;
  }
  const artwork = artworks.find((artwork) => artwork.id === id);
  if (!id || !artwork) {
    return (
      <p className="p-2 text-lg text-center">
        No Art Found. <br />
        Search for pieces or Return{" "}
        <Link className="underline font-bold" href="/">
          Home
        </Link>
      </p>
    );
  }

  const handleZoom = (ev) => {
    if (zoom === 1) {
      setOrigin({ x: ev.clientX, y: ev.clientY });
      setZoom(1.5);
    } else if (zoom === 1.5) {
      setOrigin({ x: ev.clientX, y: ev.clientY });
      setZoom(2.5);
    } else {
      setZoom(1);
      setOrigin(null);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen text-center">
      <div
        className={`inline-block overflow-scroll ${
          zoom === 2.5 ? "cursor-zoom-out" : "cursor-zoom-in"
        }`}>
        <img
          src={artwork.image}
          className="w-full block"
          onClick={handleZoom}
          style={{
            transform: `scale(${zoom})`,
            transition: "transform 0.3s ease-in-out",
            transformOrigin:
              origin === null ? "center center" : `${origin.x}px ${origin.y}px`,
          }}
        />
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-4xl font-bold italic px-8 pt-8">{artwork.title}</p>
        <p className="text-xl font-bold p-2">{artwork.artist}</p>
        <p
          className="text-md text-left p-4"
          dangerouslySetInnerHTML={{ __html: artwork.description }}></p>
      </div>
    </div>
  );
};

export default Artwork;
