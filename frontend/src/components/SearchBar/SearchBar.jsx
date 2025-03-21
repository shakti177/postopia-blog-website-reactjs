import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { X, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleClear = () => {
    setSearchText("");
  };

  const handleSearch = () => {
    if (searchText.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchText)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative max-w-md w-full">
      <div className="relative">
        <Input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyPress={handleKeyPress}
          className="outline-none pr-14"
          placeholder="Search..."
        />

        <div className="absolute inset-y-0 right-0 flex items-center gap-1 pr-3">
          {searchText && (
            <X
              className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer"
              onClick={handleClear}
            />
          )}

          <Search
            className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer"
            onClick={handleSearch}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
