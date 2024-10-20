const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbFilePath = path.join(__dirname, "database", "swagger-docs.db");

// Initialize DB with FTS5
// const db = new sqlite3.Database(":memory:");

// Create a new SQLite database connection
const db = new sqlite3.Database(dbFilePath, (err) => {
  if (err) {
    console.error("Error opening database " + err.message);
  } else {
    console.log("Connected to the SQLite database at " + dbFilePath);
  }
});

// Close the database when the app is terminated
process.on("SIGINT", () => {
  db.close((err) => {
    if (err) {
      console.error("Error closing database " + err.message);
    } else {
      console.log("Database connection closed.");
    }
    process.exit(0);
  });
});

db.serialize(() => {
  db.run(`
    CREATE VIRTUAL TABLE IF NOT EXISTS swagger_docs USING fts5(
      tags, method, uri, description, summary, definition, api_info, micro_name, api_version, content, swaggerUrl
    );
  `);
});

// create a new db in case the sealize option is not working
const initDb = (res) => {
  db.run(
    `CREATE VIRTUAL TABLE IF NOT EXISTS swagger_docs USING fts5(
      tags, method, uri, description, summary, definition, api_info, micro_name, api_version, content, swaggerUrl
    );
  )`,
    (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Database initialized successfully!" });
    }
  );
};

// Insert Swagger Doc data
const insertDoc = (doc) => {
  const {
    tags,
    method,
    uri,
    description,
    summary,
    definition,
    api_info,
    micro_name,
    api_version,
    content,
    swaggerUrl,
  } = doc;

  db.run(
    `
    INSERT INTO swagger_docs(tags, method, uri, description, summary, definition, api_info, micro_name, api_version, content, swaggerUrl)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
    [tags, method, uri, description, summary, definition, api_info, micro_name, api_version, content, swaggerUrl]
  );
};

// Search Swagger Docs
const searchDocs = (query) => {
  return new Promise((resolve, reject) => {
    db.all(
      `
      SELECT * FROM swagger_docs WHERE swagger_docs MATCH ?
    `,
      [query],
      (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      }
    );
  });
};

module.exports = { initDb, insertDoc, searchDocs };
