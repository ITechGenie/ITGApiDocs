const express = require("express");
const { parseSwagger } = require("./swaggerHandler");
const { insertDoc, searchDocs } = require("./db");

const app = express();
app.use(express.json());

// Parse Swagger Doc and store in DB
app.post("/api/parse-swagger", async (req, res) => {
  const { url } = req.body;
  try {
    const parsedData = await parseSwagger(url);
    parsedData.forEach((doc) => insertDoc(doc));
    res.status(200).json({ message: "Swagger docs parsed and saved." });
  } catch (error) {
    res.status(500).json({ error: "Error parsing Swagger doc." });
  }
});

// Search Swagger Docs
app.get("/api/search", async (req, res) => {
  console.log("Obatined Queryy", req.query);
  const { query } = req.query;
  try {
    const results = await searchDocs(query);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: "Error searching Swagger docs." });
  }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
