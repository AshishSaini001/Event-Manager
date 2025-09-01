import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchEvent } from "../features/eventSlice";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchEvent(query));  
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mr-20 mt-20 bg-gray-400 shadow-md rounded-lg p-4 flex items-center gap-2"
    >
      <input
        type="text"
        placeholder="Search events..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Search
      </button>
    </form>
  );
}
