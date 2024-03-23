/*jshint esversion: 6 */

// Express
var express = require('express');
var router = express.Router();

// JOIN, with which it is possible to add
const { join } = require('node:path');

// This can be activated to activate the indexfile / other file html on
// opening the port in the browser.
// Then the html needs to contain the css & script inline.
router.get('/gui', (req, res) => {
    res.sendFile(join(__dirname, '../chatHistory.html'));
});

// MongoDB
const mongo = require("mongodb").MongoClient;
const dsn =  process.env.DBWEBB_DSN || "mongodb://localhost:27017/chatBTH";

// Intro
router.get('/', function(req, res) {
    const data = {
        data: {
            msg: "Chat with MonogDB set up"
        }
    };

    res.json(data);
});

// Return a JSON object with list of all documents within the collection.
router.get("/list", async (request, response) => {
    try {
        let res = await findInCollection(dsn, "crowd", {}, {}, 0);

        console.log(res);
        response.json(res);
    } catch (err) {
        console.log(err);
        response.json(err);
    }
});

/**
 * Find documents in an collection by matching search criteria.
 *
 * @async
 *
 * @param {string} dsn        DSN to connect to database.
 * @param {string} colName    Name of collection.
 * @param {object} criteria   Search criteria.
 * @param {object} projection What to project in results.
 * @param {number} limit      Limit the number of documents to retrieve.
 *
 * @throws Error when database operation fails.
 *
 * @return {Promise<array>} The resultset as an array.
 */
async function findInCollection(dsn, colName, criteria, projection, limit) {
    const client  = await mongo.connect(dsn);
    const db = await client.db();
    const col = await db.collection(colName);
    const res = await col.find(criteria, projection).limit(limit).toArray();

    await client.close();

    return res;
}


module.exports = router;
