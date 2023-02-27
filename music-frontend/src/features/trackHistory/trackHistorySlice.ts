import { ITrackHistory } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createTrackHistory, fetchTrackHistory } from './trackHistoryThunks';

interface TrackHistoryState {
  items: ITrackHistory[];
  fetchLoading: boolean;
  createLoading: boolean;
}

const initialState: TrackHistoryState = {
  items: [],
  fetchLoading: false,
  createLoading: false,
};

const trackHistorySlice = createSlice({
  name: 'trackHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTrackHistory.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchTrackHistory.fulfilled, (state, {payload: trackHistory}) => {
      state.fetchLoading = false;
      state.items = trackHistory;
    });
    builder.addCase(fetchTrackHistory.rejected, (state) => {
      state.fetchLoading = false;
    });
    builder.addCase(createTrackHistory.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createTrackHistory.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createTrackHistory.rejected, (state) => {
      state.createLoading = false;
    });

  }
});

export const trackHistoryReducer = trackHistorySlice.reducer;

export const selectTrackHistory = (state: RootState) => state.trackHistory.items;
export const selectTrackHistoryFetching = (state: RootState) => state.trackHistory.fetchLoading;
export const selectTrackHistoryCreating = (state: RootState) => state.trackHistory.createLoading;