import { ITracks, ValidationError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createTrack, fetchTracks } from './tracksThunks';

interface TracksState {
  items: ITracks | null;
  fetchLoading: boolean;
  createLoading: boolean;
  createTrackError: ValidationError | null;
}

const initialState: TracksState = {
  items: null,
  fetchLoading: false,
  createLoading: false,
  createTrackError: null,
};

const tracksSLice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTracks.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchTracks.fulfilled, (state, {payload: tracks}) => {
      state.fetchLoading = false;
      state.items = tracks;
    });
    builder.addCase(fetchTracks.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(createTrack.pending, (state) => {
      state.createTrackError = null;
      state.createLoading = true;
    });
    builder.addCase(createTrack.fulfilled, (state, ) => {
      state.createLoading = false;
    });
    builder.addCase(createTrack.rejected, (state, {payload: error}) => {
      state.createTrackError = error || null;
      state.createLoading = false;
    });
  }
});

export const tracksReducer = tracksSLice.reducer;

export const selectTracks = (state: RootState) => state.tracks.items;
export const selectTracksFetching = (state: RootState) => state.tracks.fetchLoading;
export const selectTrackCreating = (state: RootState) => state.tracks.createLoading;
export const selectCreateTrackError = (state: RootState) => state.tracks.createTrackError;