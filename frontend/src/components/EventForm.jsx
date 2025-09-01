import { useState } from "react";
import { useDispatch } from "react-redux";
import { addEvent } from "../features/eventSlice";

export default function EventForm() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, date }),
      });

      if (!res.ok) throw new Error("Failed to save event");

      const savedEvent = await res.json(); 
      dispatch(addEvent(savedEvent));       

      setName("");
      setDate("");
    } catch (err) {
      console.error("Error adding event:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="ml-20 mt-20 h-70 w-1/3 bg-gray-400 shadow-md rounded-lg p-4 space-y-4"
    >
      <input
        type="text"
        placeholder="Event name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded my-9"
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded"
      >
        Add Event
      </button>
    </form>
  );
}
