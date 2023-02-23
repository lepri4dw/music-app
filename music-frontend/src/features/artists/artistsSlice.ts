import { Artist } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchArtists, fetchOneArtist } from './artistsThunks';

interface ArtistsState {
  items: Artist[],
  fetchLoading: boolean;
  oneArtist: Artist | null;
  fetchOneLoading: boolean;
}

const initialState: ArtistsState = {
  items: [],
  fetchLoading: false,
  oneArtist: null,
  fetchOneLoading: false
};

const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArtists.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchArtists.fulfilled, (state, {payload: artists}) => {
      state.fetchLoading = false;
      state.items = artists;
    });
    builder.addCase(fetchArtists.rejected, (state) => {
      state.fetchLoading = false;
    });
    builder.addCase(fetchOneArtist.pending, (state) => {
      state.fetchOneLoading = true;
    });
    builder.addCase(fetchOneArtist.fulfilled, (state, {payload: artist}) => {
      state.fetchOneLoading = false;
      state.oneArtist = artist;
    });
    builder.addCase(fetchOneArtist.rejected, (state) => {
      state.fetchOneLoading = false;
    });
  },
});

export const artistsReducer = artistsSlice.reducer;

export const selectArtists = (state: RootState) => state.artists.items;
export const selectArtistsFetching = (state: RootState) => state.artists.fetchLoading;
export const selectOneArtist = (state: RootState) => state.artists.oneArtist;
export const selectOneArtistFetching = (state: RootState) => state.artists.fetchOneLoading;