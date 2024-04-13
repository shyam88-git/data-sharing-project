import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GisFileI } from "./gisFileApi";
import { SearchParamsI } from "../../../utils/interfaces/common";
import { GetRequest } from "../../../plugins/https";

export interface GisAllFileResponseI {
  current_page: number;
  total: number;
  per_page: number;
  total_pages: number;
  results: GisFileI[];
}

const initialGisAllFileResponse: GisAllFileResponseI = {
  current_page: 0,
  total: 0,
  per_page: 0,
  total_pages: 0,
  results: [],
};

interface GisFileState {
  loading: boolean;
  error: string | undefined;
  activeGis: GisFileI | null;
  allGisFile: GisAllFileResponseI;
}

const initialState: GisFileState = {
  loading: false,
  error: undefined,
  activeGis: null,
  allGisFile: initialGisAllFileResponse,
};

export const getAllGisFile = createAsyncThunk(
  "gisFile/getAllGisFile",
  async (data: { params: SearchParamsI }) => {
    const { search, page, per_page } = data.params;
    try {
      const response = await GetRequest(
        `/gis-file-upload/?search=${search}&page=${page}&per_page=${per_page}`
      );
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }
);

const gisFileSlice = createSlice({
  name: "gisFile",
  initialState: {
    ...initialState,
    activeGis: localStorage.getItem("activeGis")
      ? JSON.parse(localStorage.getItem("activeGis")!)
      : null,
  },
  reducers: {
    setActiveGis: (state, action: PayloadAction<GisFileI | null>) => {
      state.activeGis = action.payload;
      localStorage.setItem("activeGis", JSON.stringify(action.payload));
    },
    clearActiveGis: (state) => {
      state.activeGis = null;
      localStorage.removeItem("activeGis");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllGisFile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getAllGisFile.fulfilled,
      (state, action: PayloadAction<GisAllFileResponseI>) => {
        state.loading = false;
        state.allGisFile = action.payload;
      }
    );
    builder.addCase(getAllGisFile.rejected, (state, action) => {
      state.loading = false;
      state.allGisFile = initialGisAllFileResponse;
      state.error = action.error.message;
    });
  },
});

export const { setActiveGis, clearActiveGis } = gisFileSlice.actions;

export default gisFileSlice.reducer;
