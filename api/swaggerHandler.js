const axios = require("axios");
const SwaggerParser = require("@apidevtools/swagger-parser");

// Function to fetch and parse Swagger JSON
const parseSwagger = async (url) => {
  try {
    const response = await axios.get(url);
    const swaggerDoc = await SwaggerParser.dereference(response.data);

    const parsedData = [];
    const { paths, info, tags } = swaggerDoc;

    // Extracting details from each path
    for (const [uri, methods] of Object.entries(paths)) {
      for (const [method, details] of Object.entries(methods)) {
        parsedData.push({
          tags: details.tags ? details.tags.join(", ") : "",
          method,
          uri,
          swaggerUrl: url,
          description: details.description || "",
          summary: details.summary || "",
          definition: JSON.stringify(details.responses || {}),
          api_info: JSON.stringify(info),
          micro_name: info.title || "",
          api_version: info.version || "",
          content: `${method} ${uri} ${details.summary || ""} ${details.description || ""}`,
        });
      }
    }

    return parsedData;
  } catch (error) {
    console.error("Error parsing Swagger:", error);
    throw error;
  }
};

module.exports = { parseSwagger };
