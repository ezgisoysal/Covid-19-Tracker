import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";

export const getData = createAsyncThunk("covidSlice/getData", async (country) => {
  if (country === "Global") {
    const res = await axios.get("https://covid19.mathdro.id/api");
    return res.data;
  } else {
    const res = await axios.get(
      `https://covid19.mathdro.id/api/countries/${country}`
    );
    return res.data;
  }
});

export const covidSlice = createSlice({
  name: 'covid',
  initialState: {
    items: {
      confirmed: 0,
      recovered: 0,
      deaths: 0,
      active: 0,
      lastUpdate: "",
    },
    country: "",
  },
  reducers: {
    setCountry: (state, action) => {
      state.country = action.payload;
    }
  },
  extraReducers: {
    [getData.fulfilled]: (state, action) => {
      state.items.confirmed = action.payload.confirmed.value;
      state.items.recovered = action.payload.recovered.value;
      state.items.deaths = action.payload.deaths.value;
      state.items.active = state.items.confirmed - state.items.recovered - state.items.deaths;
      state.items.lastUpdate = action.payload.lastUpdate;
      state.items.name = action.payload;
    }
  },
});

export const { setCountry } = covidSlice.actions;
export default covidSlice.reducer;