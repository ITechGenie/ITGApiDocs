import React, { useState } from "react";

const SearchBox = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search Swagger docs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "60%", padding: "10px", fontSize: "18px" }}
      />
      <button type="submit" style={{ padding: "10px", fontSize: "18px" }}>
        Search
      </button>
    </form>
  );
};

export default SearchBox;
