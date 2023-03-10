import { Album, ValidationError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createAlbum, fetchAlbums } from './albumsThunks';

interface AlbumsState {
  items: Album[];
  fetchLoading: boolean;
  createLoading: boolean;
  createAlbumError: ValidationError | null;
}

const initialState: AlbumsState = {
  items: [],
  fetchLoading: false,
  createLoading: false,
  createAlbumError: null,
};

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbums.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchAlbums.fulfilled, (state, {payload: albums}) => {
      state.fetchLoading = false;
      state.items = albums
    });
    builder.addCase(fetchAlbums.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(createAlbum.pending, (state) => {
      state.createAlbumError = null;
      state.createLoading = true;
    });
    builder.addCase(createAlbum.fulfilled, (state, ) => {
      state.createLoading = false;
    });
    builder.addCase(createAlbum.rejected, (state, {payload: error}) => {
      state.createAlbumError = error || null;
      state.createLoading = false;
    });
  },
});

export const albumsReducer = albumsSlice.reducer;

export const selectAlbums = (state: RootState) => state.albums.items;
export const selectAlbumsFetching = (state: RootState) => state.albums.fetchLoading;
export const selectAlbumCreating = (state: RootState) => state.albums.createLoading;
export const selectCreateAlbumError = (state: RootState) => state.albums.createAlbumError;

