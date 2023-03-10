import { Artist, ValidationError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createArtist, fetchArtists, fetchOneArtist, publishedArtist } from './artistsThunks';

interface ArtistsState {
  items: Artist[],
  fetchLoading: boolean;
  oneArtist: Artist | null;
  fetchOneLoading: boolean;
  createLoading: boolean;
  createArtistError: ValidationError | null;
  publishedLoading: boolean;
}

const initialState: ArtistsState = {
  items: [],
  fetchLoading: false,
  oneArtist: null,
  fetchOneLoading: false,
  createLoading: false,
  createArtistError: null,
  publishedLoading: false
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

    builder.addCase(createArtist.pending, (state) => {
      state.createArtistError = null;
      state.createLoading = true;
    });
    builder.addCase(createArtist.fulfilled, (state, ) => {
      state.createLoading = false;
    });
    builder.addCase(createArtist.rejected, (state, {payload: error}) => {
      state.createArtistError = error || null;
      state.createLoading = false;
    });

    builder.addCase(publishedArtist.pending, (state) => {
      state.publishedLoading = true;
    });
    builder.addCase(publishedArtist.fulfilled, (state) => {
      state.publishedLoading = false;
    });
    builder.addCase(publishedArtist.rejected, (state) => {
      state.publishedLoading = false;
    });

  },
});

export const artistsReducer = artistsSlice.reducer;

export const selectArtists = (state: RootState) => state.artists.items;
export const selectArtistsFetching = (state: RootState) => state.artists.fetchLoading;
export const selectOneArtist = (state: RootState) => state.artists.oneArtist;
export const selectOneArtistFetching = (state: RootState) => state.artists.fetchOneLoading;
export const selectArtistCreating = (state: RootState) => state.artists.createLoading;
export const selectCreateArtistError = (state: RootState) => state.artists.createArtistError;
export const selectPublishedArtistLoading = (state: RootState) => state.artists.publishedLoading;