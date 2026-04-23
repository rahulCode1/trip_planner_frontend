import { useState, useEffect } from "react";
import axios from "axios";

const LocationSearch = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSelected, setIsSelected] = useState(false); // ✅ new

  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

  useEffect(() => {
    // 🚫 If user just selected, skip API call
    if (isSelected) return;

    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`,
          {
            params: {
              access_token: MAPBOX_TOKEN,
              types: "place,country",
              limit: 5,
            },
          }
        );

        setSuggestions(res.data.features);
      } catch (err) {
        console.error(err);
      }
    };

    const delay = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(delay);
  }, [query, isSelected]);

  return (
    <div className="w-full max-w-md mx-auto relative">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsSelected(false); // ✅ user typing again
        }}
        placeholder="Enter city or country"
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {suggestions.length > 0 && (
        <ul className="absolute w-full bg-white border rounded-lg mt-1 shadow-lg z-10">
          {suggestions.map((item) => (
            <li
              key={item.id}
              onClick={() => {
                setQuery(item.place_name);
                setSuggestions([]);
                setIsSelected(true); // ✅ prevent refetch
              }}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {item.place_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationSearch;