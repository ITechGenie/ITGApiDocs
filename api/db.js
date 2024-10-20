const sqlite3 = require("sqlite3").verbose();

// Initialize DB with FTS5
const db = new sqlite3.Database(":memory:");

db.serialize(() => {
  db.run(`
    CREATE VIRTUAL TABLE IF NOT EXISTS swagger_docs USING fts5(
      tags, method, uri, description, summary, definition, api_info, micro_name, api_version, content, swaggerUrl
    );
  `);
});

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

module.exports = { insertDoc, searchDocs };
