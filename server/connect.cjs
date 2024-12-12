require("dotenv").config({ path: "./config.env" });
const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb")
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
let client;

async function connectToDatabase() {
    if (!client) {
        const Db = process.env.ATLAS_URI;
        client = new MongoClient(Db);
        await client.connect();
        console.log("Connected to MongoDB");
    }
    return client;
}

async function readFromCollection(dbName, collectionName, query = {}) {
    try {

        const client = await connectToDatabase();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);


        const data = await collection.find(query).toArray();
        console.log("Data retrieved:", data);

        return data;
    } catch (error) {
        console.error("Error reading from collection:", error);
        throw error;
    }
}

app.get("/getEvents", async (req, res) => {
    try {
        const data = await readFromCollection("Project2", "events", {});
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post('/postEvents', async (req, res) => {
    console.log('Received data:', req.body);
    try {
        const client = await connectToDatabase();
        const db = client.db("Project2");
        const collection = db.collection("events");

        const result = await collection.insertOne(req.body);

        if (result.insertedId) {
            const newEvent = { ...req.body, _id: result.insertedId };
            res.status(201).json({ message: "Event added successfully", event: newEvent });
        } else {
            res.status(500).json({ message: "Failed to add event" });
        }
    } catch (error) {
        console.error("Error saving event:", error);
        res.status(500).json({ message: "Error adding event", error: error.message });
    }
});

app.delete('/deleteEvent/:id', async (req, res) => {
    const eventId = req.params.id;

    try {
        const client = await connectToDatabase();
        const db = client.db("Project2");
        const collection = db.collection("events");

        const result = await collection.deleteOne({ _id: new ObjectId(eventId) });

        if (result.deletedCount === 1) {
            res.status(200).json({ message: "Event deleted successfully" });
        } else {
            res.status(404).json({ message: "Event not found" });
        }
    } catch (error) {
        console.error("Error deleting event:", error);
        res.status(500).json({ message: "Error deleting event", error: error.message });
    }
});

app.get("/getProducts", async (req, res) => {
    try {
        const data = await readFromCollection("Project2", "products", {});
        res.status(200).json(data); 
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post('/postProduct', async (req, res) => {
    console.log('Received data:', req.body);
    try {
        const client = await connectToDatabase();
        const db = client.db("Project2");
        const collection = db.collection("products");


        const result = await collection.insertOne(req.body);

        if (result.insertedId) {
            const newEvent = { ...req.body, _id: result.insertedId };
            res.status(201).json({ message: "Event added successfully", event: newEvent });
        } else {
            res.status(500).json({ message: "Failed to add event" });
        }
    } catch (error) {
        console.error("Error saving event:", error);
        res.status(500).json({ message: "Error adding event", error: error.message });
    }
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});

