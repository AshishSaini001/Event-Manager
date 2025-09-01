const router = require("express").Router();
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../Data/events.json");

// === Helper functions ===
function getEvents() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data || "[]");
}

function saveEvents(events) {
  fs.writeFileSync(filePath, JSON.stringify(events, null, 2), "utf-8");
}

// === Routes ===

// GET all events (with optional filtering)
router.get("/", (req, res) => {
  let events = getEvents();

  if (req.query.name) {
    const name = req.query.name.toLowerCase();
    events = events.filter(event =>
      event.name.toLowerCase().includes(name)
    );
  }

  if (req.query.date) {
    const date = req.query.date;
    events = events.filter(event => event.date === date);
  }

  res.json(events);
});

// GET single event by id
router.get("/:id", (req, res) => {
  const events = getEvents();
  const event = events.find(e => e.id === Number(req.params.id));

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }
  res.json(event);
});

// POST create new event
router.post("/", (req, res) => {
  const { name, date } = req.body;
  if (!(name && date)) {
    return res.status(400).json({ message: "Name and date are required" });
  }

  const events = getEvents();
  const newEvent = {
    id: Date.now(), // unique id
    name,
    date,
  };

  events.push(newEvent);
  saveEvents(events);
  res.status(201).json(newEvent);
});

// PUT update event
router.put("/:id", (req, res) => {
  const events = getEvents();
  const eventIndex = events.findIndex(e => e.id === Number(req.params.id));

  if (eventIndex === -1) {
    return res.status(404).json({ message: "Event not found" });
  }

  const { name, date } = req.body;
  if (name) events[eventIndex].name = name;
  if (date) events[eventIndex].date = date;

  saveEvents(events);
  res.json(events[eventIndex]);
});

// DELETE event
router.delete("/:id", (req, res) => {
  let events = getEvents();
  const eventIndex = events.findIndex(e => e.id === Number(req.params.id));

  if (eventIndex === -1) {
    return res.status(404).json({ message: "Event not found" });
  }

  const deletedEvent = events.splice(eventIndex, 1)[0];
  saveEvents(events);
  res.json(deletedEvent);
});

module.exports = router;
