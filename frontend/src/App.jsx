import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { addEvent } from "./features/eventSlice";
import EventForm from "./components/EventForm";
import EventList from "./components/Eventlist";
import SearchBar from "./components/SearchBar"

function App() {
  const dispatch =useDispatch();
  useEffect(() => {
    fetch("http://localhost:5000/events")
      .then((res) => res.json())
      .then((data) => {
        // Save fetched events to Redux
        data.forEach((event) => {
          dispatch(addEvent(event));
        });
      })
      .catch((err) => console.error("Error fetching events:", err));
  }, [dispatch]);


  return (
    <div className="min-h-screen bg-gray-800 p-6">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
        📅 Event Manager
      </h1>

      <div className="min-h-[500px] flex justify-between bg-gradient-to-r from-[rgb(2,1,40)] to-[rgb(114,149,207)] p-6 rounded-lg">
        <EventForm  />
        
        <div className="min-h-[500px] max-h-40 w-[600px] ">
          <EventList   />
        </div>
      </div>
    </div>
  );
}

export default App;
