import { Album, ValidationError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createAlbum, deleteAlbum, fetchAlbums, publishedAlbum } from './albumsThunks';

interface AlbumsState {
  items: Album[];
  fetchLoading: boolean;
  createLoading: boolean;
  createAlbumError: ValidationError | null;
  publishedLoading: string | false;
  deleteLoading: string | false;
}

const initialState: AlbumsState = {
  items: [],
  fetchLoading: false,
  createLoading: false,
  createAlbumError: null,
  publishedLoading: false,
  deleteLoading: false,
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

    builder.addCase(publishedAlbum.pending, (state, {meta: {arg: id}}) => {
      state.publishedLoading = id;
    });
    builder.addCase(publishedAlbum.fulfilled, (state) => {
      state.publishedLoading = false;
    });
    builder.addCase(publishedAlbum.rejected, (state) => {
      state.publishedLoading = false;
    });

    builder.addCase(deleteAlbum.pending, (state, {meta: {arg: id}}) => {
      state.deleteLoading = id;
    });
    builder.addCase(deleteAlbum.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteAlbum.rejected, (state) => {
      state.deleteLoading = false;
    });
  },
});

export const albumsReducer = albumsSlice.reducer;

export const selectAlbums = (state: RootState) => state.albums.items;
export const selectAlbumsFetching = (state: RootState) => state.albums.fetchLoading;
export const selectAlbumCreating = (state: RootState) => state.albums.createLoading;
export const selectCreateAlbumError = (state: RootState) => state.albums.createAlbumError;
export const selectAlbumPublishing = (state: RootState) => state.albums.publishedLoading;
export const selectAlbumDeleting = (state: RootState) => state.albums.deleteLoading;
