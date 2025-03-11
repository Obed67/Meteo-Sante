import { useState } from "react";
import { Search } from "lucide-react";
import { beninCities } from "../data/cities";

interface SearchBarProps {
  onSelectCity: (city: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSelectCity }) => {
  const [query, setQuery] = useState("");
  const [filteredCities, setFilteredCities] = useState(beninCities);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setQuery(value);

    const filtered = beninCities.filter((city) =>
      city.name.toLowerCase().includes(value)
    );
    setFilteredCities(filtered);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="flex items-center border rounded-lg p-2 shadow-sm bg-white">
        <Search className="text-gray-500 w-5 h-5 ml-2" />
        <input
          type="text"
          placeholder="Rechercher une ville..."
          value={query}
          onChange={handleSearch}
          className="w-full p-2 focus:outline-none"
        />
      </div>
      {query && (
        <ul className="absolute w-full bg-white shadow-lg rounded-lg mt-2 max-h-60 overflow-auto z-10">
          {filteredCities.length > 0 ? (
            filteredCities.map((city) => (
              <li
                key={city.name}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  onSelectCity(city.name);
                  setQuery(""); // Effacer la recherche après sélection
                }}
              >
                {city.displayName}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">Aucune ville trouvée</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
