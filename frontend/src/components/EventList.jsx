import { useDispatch, useSelector } from "react-redux";
import { deleteEvent, updateEvent } from "../features/eventSlice";
import { useState } from "react";
import {Trash,SquarePen} from "lucide-react"

export default function EventList() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.event.events);

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDate, setEditDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // 🔍 Filtered events based on search
  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/events/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete event " + id);
        dispatch(deleteEvent(Number(id)));
      })
      .catch((err) => console.error(err));
  };

  const startEdit = (event) => {
    setEditingId(event.id);
    setEditName(event.name);
    setEditDate(event.date);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditDate("");
  };

  const handleEditSave = (id) => {
    const updatedEvent = { name: editName, date: editDate };
    fetch(`http://localhost:5000/events/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedEvent),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update event " + id);
        return res.json();
      })
      .then(() => {
        dispatch(updateEvent({ id, ...updatedEvent }));
        cancelEdit();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-120 max-h-120 max-w-200 min-w-140 overflow-auto scrollbar-none mr-20 mt-5 bg-gray-400 shadow-md rounded-lg p-4 space-y-3">
      <h2 className="text-xl font-semibold mb-3">Events</h2>

      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="Search events..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {filteredEvents.length === 0 && (
        <p className="text-gray-500">No events found.</p>
      )}

      {filteredEvents.map((event) => (
        <div
          key={event.id}
          className="flex items-center justify-between p-2 border rounded"
        >
          {editingId === event.id ? (
            <>
              <input
                className="mr-2 px-2 py-1 rounded"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Event Name"
              />
              <input
                className="mr-2 px-2 py-1 rounded"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
                type="date"
              />
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditSave(event.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <span>
                {event.name} -{" "}
                <span className="text-gray-800">{event.date}</span>
              </span>
              <div className="flex space-x-3">
                <button
                  onClick={() => startEdit(event)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 cursor-pointer"
                >
                 < SquarePen />
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                >
                 <Trash />
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
