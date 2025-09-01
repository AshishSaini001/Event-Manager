import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: [],
  searchQuery: ""   
};

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    deleteEvent: (state, action) => {
      state.events = state.events.filter(
        (event) => event.id !== Number(action.payload)
      );
    },
    updateEvent: (state, action) => {
      const index = state.events.findIndex(
        (event) => event.id === Number(action.payload.id)
      );
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
    searchEvent: (state, action) => {
      state.searchQuery = action.payload; 
    }
  }
});

export const { addEvent, deleteEvent, updateEvent, searchEvent } =
  eventSlice.actions;

export default eventSlice.reducer;
