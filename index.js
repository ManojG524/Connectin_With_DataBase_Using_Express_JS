const express = require("express");
const app = express();
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

let dbPath = path.join(__dirname, "goodreads.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    app.listen(3000, () => {
      console.log("Server running at http://localhost:3000");
    });
  } catch (e) {
    console.log(`DB ERROR Message ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

app.get(__dirname, async (response, request) => {
  const goodReadBooksList = `SELECT * FROM book ORDER BY book_id`;

  const bookArray = await db.all(goodReadBooksList);
  response.send(bookArray);
});
