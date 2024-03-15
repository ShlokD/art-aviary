import { createContext } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";

const AppContext = createContext({
  artworks: [],
});

export const useAppContext = () => useContext(AppContext);

const BASE_URL = "https://api.artic.edu/api/v1/artworks";

const transformResponse = (json) => {
  return json.data.map((item) => {
    return {
      id: item.id,
      title: item.title || "Untitled Work",
      artist: item.artist_title || "Artist Unknown",
      image: `${json.config.iiif_url}/${item.image_id}/full/843,/0/default.jpg`,
      alt: item?.thumbnail?.alt,
      description: item.description,
    };
  });
};

const AppContextProvider = ({ children }) => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const searchArtworks = async (searchTerm) => {
    try {
      setLoading(true);
      const url = `${BASE_URL}/search?q=${searchTerm}`;
      const res = await fetch(url);
      const json = await res.json();
      setArtworks(transformResponse(json));
      setLoading(false);
    } catch (_) {
      setLoading(false);
      setArtworks([]);
    }
  };

  const loadArtworks = async () => {
    try {
      setLoading(true);
      const url = `${BASE_URL}?page=${page}&limit=100`;
      const res = await fetch(url);
      const json = await res.json();
      setArtworks(transformResponse(json));
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setArtworks([]);
    }
  };

  useEffect(() => {
    loadArtworks();
  }, [page]);

  return (
    <AppContext.Provider
      value={{ artworks, searchArtworks, page, setPage, loading }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
