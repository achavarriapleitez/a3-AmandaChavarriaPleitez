const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// ===== Middleware =====
app.use(express.static("public"));
app.use(express.static("views"));
app.use(express.json());

// ===== MongoDB setup =====
const uri = `mongodb+srv://${process.env.USERNM}:${process.env.PASS}@${process.env.HOST}/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let entriesCollection = null;
let usersCollection = null;

async function connectDB() {
  try {
    await client.connect();
    const db = client.db("A3");

    entriesCollection = db.collection("myA3Data");
    usersCollection = db.collection("users");

    // confirm connection
    await db.command({ ping: 1 });
    console.log("✅ Connected to MongoDB!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

connectDB();

// ===== Routes =====

// Home
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/index.html"));
});

// User login
app.post("/login", async (req, res) => {
  const { username } = req.body;

  if (!username) return res.status(400).json({ error: "Username is required" });

  try {
    let user = await usersCollection.findOne({ username });

    if (!user) {
      await usersCollection.insertOne({ username });
      console.log("New user created:", username);
    } else {
      console.log("User logged in:", username);
    }

    res.json({ success: true, username });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

// Get all entries for a specific user
app.get("/entries/:username", async (req, res) => {
  try {
    const entries = await entriesCollection
      .find({ username: req.params.username })
      .toArray();
    res.json(entries);
  } catch (err) {
    console.error("Error fetching entries:", err);
    res.status(500).send("Error fetching entries");
  }
});

// Add new entry
app.post("/submit", async (req, res) => {
  try {
    const newEntry = req.body;

    if (!newEntry.username) {
      return res.status(400).json({ error: "Username is required >:(" });
    }

    // Ensure notes field exists
    newEntry.notes = newEntry.notes || "";

    // Derived field: score
    const moodValues = { Happy: 2, Neutral: 1, Sad: 0 };
    const energyValues = {
      1: 0, 2: 0, 3: 1, 4: 2, 5: 3,
      6: 4, 7: 5, 8: 6, 9: 7, 10: 8
    };
    newEntry.score =
      (moodValues[newEntry.mood] || 0) + (energyValues[newEntry.energy] || 0);

    // Derived field: status
    if (newEntry.mood === "Happy" && newEntry.energy >= 7) newEntry.status = "High Spirits";
    else if (newEntry.mood === "Sad" && newEntry.energy <= 3) newEntry.status = "Low Point";
    else if (newEntry.energy >= 8) newEntry.status = "Energized";
    else if (newEntry.energy <= 3) newEntry.status = "Tired";
    else newEntry.status = "Moderate";

    const result = await entriesCollection.insertOne(newEntry);
    console.log("Inserted entry:", result.insertedId);

    res.json({ _id: result.insertedId, ...newEntry });
  } catch (err) {
    console.error("Error inserting entry:", err);
    res.status(500).send("Error inserting entry");
  }
});

// Update an entry
app.put("/entries/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedEntry = req.body;

    // Ensure notes field exists
    updatedEntry.notes = updatedEntry.notes || "";

    const result = await entriesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedEntry }
    );

    if (result.modifiedCount === 1) res.json({ message: "Updated successfully" });
    else res.status(404).json({ error: "Entry not found" });
  } catch (err) {
    console.error("Error updating entry:", err);
    res.status(500).send("Error updating entry");
  }
});

// Delete entry by ID
app.delete("/entries/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Deleting entry with id:", id);

    const result = await entriesCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 1) res.json({ message: "Entry deleted" });
    else res.status(404).json({ error: "Entry not found" });
  } catch (err) {
    console.error("Error deleting entry:", err);
    res.status(500).send("Error deleting entry");
  }
});

// ===== Start Server =====
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
