import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calendarAPI } from "@lib/API/api";
import { calendarType } from "@lib/types";

const initialState = {
  calendar: [] as calendarType[],
  isPending: true,
  oneCalendar: {} as calendarType,
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setCalendar(state, action: PayloadAction<calendarType[]>) {
      state.calendar = action.payload;
      state.isPending = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(getCalendarByDates.fulfilled, (state, action) => {
      state.calendar = action.payload;
      state.isPending = false;
    });
    builder.addCase(getOneCalendar.fulfilled, (state) => {
      state.oneCalendar = state.calendar[0];
      state.isPending = false;
    });
    builder.addCase(addCalendar.fulfilled, (state, action: PayloadAction<calendarType>) => {
      state.calendar.push(action.payload);
      state.isPending = false;
    });
    builder.addCase(deleteNote.fulfilled, (state, action: PayloadAction<string>) => {
      state.calendar = state.calendar.filter(element => element._id.$oid !== action.payload);
      state.isPending = false;
    });
    builder.addCase(updateNote.fulfilled, (state, action) => {
      state.calendar = state.calendar.map(element => {
        if (element._id.$oid === action.payload._id.$oid) {
          return action.payload;
        }
        return element;
      });
      state.isPending = false;
    });
  },
});

export const addCalendar = createAsyncThunk(
  "calendar/addCalendar",
  async (data: { time: string; note: string }) => {
    const response = await calendarAPI.addCalendar(data);
    if (response.status === 200) return response.data;
  }
);

export const getCalendarByDates = createAsyncThunk(
  "calendar/getCalendarByDates",
  async (data: { startDate: string; endDate: string }) => {
    const response = await calendarAPI.getCalendarByDates(data);
    if (response.status === 200) return response.data;
  }
);

export const deleteNote = createAsyncThunk(
  "calendar/deleteNote",
  async (data: { time: string; noteId: string }) => {
    const response = await calendarAPI.deleteNote(data);
    if (response.status === 200) return response.data;
  }
);

export const getOneCalendar = createAsyncThunk(
  "calendar/getOneCalendar",
  async (date: string) => {
    const response = await calendarAPI.getOneCalendar(date);
    if (response.status === 200) return response.data;
  }
);

export const updateNote = createAsyncThunk(
  "calendar/updateNote",
  async (data: { date: string; time: string; noteId: string; note: string }) => {
    const response = await calendarAPI.updateNote(data);
    if (response.status === 200) return response.data;
  }
);

export const { setCalendar } = calendarSlice.actions;
export default calendarSlice.reducer;