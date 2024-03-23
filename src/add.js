/**
 * Connect to the database and setup it with some default data.
 */
"use strict";

const mongo = require("mongodb").MongoClient;
const dsn =  process.env.DBWEBB_DSN || "mongodb://localhost:27017/chatBTH";

// const fs = require("fs");
// const path = require("path");
// const docs = JSON.parse(fs.readFileSync(
//     path.resolve(__dirname, "setup.json"),
//     "utf8"
// ));

// Do it.
var doc = { comment: "testing this", shape: "undefined" };
addToCollection(dsn, "crowd", doc)
    .catch(err => console.log(err));

/**
 * Add to collection
 *
 * @async
 *
 * @param {string} dsn     DSN to connect to database.
 * @param {string} colName Name of collection.
 * @param {string} doc     Documents to be inserted into collection.
 *
 * @throws Error when database operation fails.
 *
 * @return {Promise<void>} Void
 */
async function addToCollection(dsn, colName, doc) {
    const client  = await mongo.connect(dsn);
    const db = await client.db();
    const col = await db.collection(colName);

    const result = await col.insertOne(doc);
    console.log(
        `A document was inserted with the _id: ${result.insertedId}`,
     );

    await client.close();
}