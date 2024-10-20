import React, { useState } from "react";
import axios from "axios";
import SearchBox from "./components/SearchBox";
import SearchResults from "./components/SearchResults";
import SwaggerViewer from "./components/SwaggerViewer";
import "./App.css";

const App = () => {
  const [results, setResults] = useState([]);
  const [selectedSwaggerUrl, setSelectedSwaggerUrl] = useState("");

  // Trigger search on API call
  const handleSearch = async (query) => {
    try {
      setSelectedSwaggerUrl("");
      const response = await axios.get(`/api/search?query=${query}`);
      const resultsWithMatchedKeywords = response.data.map((result) => {
        const matchedKeywords = [];
        const keywordsToMatch = ["tags", "method", "uri", "description", "summary", "definition", "apiVersion"];

        // Check if any of the defined keywords are found in the result
        keywordsToMatch.forEach((keyword) => {
          if (result[keyword] && result[keyword].toLowerCase().includes(query.toLowerCase())) {
            matchedKeywords.push(keyword);
          }
        });

        return { ...result, matchedKeywords };
      });
      setResults(resultsWithMatchedKeywords);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // Handle Swagger doc selection
  const handleSelectSwagger = (swaggerUrl) => {
    console.log("Selected Swagger URL:", swaggerUrl);
    setSelectedSwaggerUrl(swaggerUrl);
  };

  return (
    <div className="App">
      <h1>Swagger API Search</h1>
      <SearchBox onSearch={handleSearch} />
      <SearchResults results={results} onSelect={handleSelectSwagger} />
      <SwaggerViewer swaggerUrl={selectedSwaggerUrl} />
    </div>
  );
};

export default App;
