import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { X, Search } from "lucide-react";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");

  const handleClear = () => {
    setSearchText("");
  };

  const handleSearch = () => {
    if (searchText.trim()) {
      console.log("Searching for:", searchText);
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
          className="w-full pr-20 rounded-lg bg-gray-100 focus:bg-white focus-visible:ring-0"
          placeholder="Search..."
        />

        <div className="absolute inset-y-0 right-0 flex items-center gap-1 pr-3">
          {searchText && (
            <X
              className="h-5 w-5 text-gray-400 hover:text-gray-600"
              onClick={handleClear}
            />
          )}

          <Search
            className="h-5 w-5 text-gray-400 hover:text-gray-600"
            onClick={handleSearch}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
