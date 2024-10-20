import React from "react";

const SearchResults = ({ results, onSelect }) => {
  return (
    <div>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {results.map((result, index) => (
          <li
            key={index}
            onClick={() => onSelect(result.swaggerUrl + "#" + result.method + "-" + result.uri)}
            style={{ cursor: "pointer", padding: "10px", borderBottom: "1px solid #ddd" }}
          >
            <>
              <strong>{result.micro_name}</strong> <br />
              API Version: {result?.api_version} <br />
              API Detail: {result?.content} <br />
              Method: {result?.method} <br />
              Description: {result?.description} <br />
              Summary: {result?.summary} <br />
              Matched: {result?.matchedKeywords?.join(", ")}
            </>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
