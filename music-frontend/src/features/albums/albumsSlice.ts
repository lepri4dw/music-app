import { Album } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchAlbums } from './albumsThunks';

interface AlbumsState {
  items: Album[];
  fetchLoading: boolean;
  oneAlbum: null | Album;
  fetchOneLoading: boolean;
}

const initialState: AlbumsState = {
  items: [],
  fetchLoading: false,
  oneAlbum: null,
  fetchOneLoading: false
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
  },
});

export const albumsReducer = albumsSlice.reducer;

export const selectAlbums = (state: RootState) => state.albums.items;
export const selectAlbumsFetching = (state: RootState) => state.albums.fetchLoading;
export const selectOneAlbum = (state: RootState) => state.albums.oneAlbum;
export const selectOneAlbumFetching = (state: RootState) => state.albums.fetchOneLoading;
