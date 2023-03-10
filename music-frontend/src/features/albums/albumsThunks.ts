import { createAsyncThunk } from '@reduxjs/toolkit';
import { Album, AlbumMutation, ValidationError } from '../../types';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';

export const fetchAlbums = createAsyncThunk<Album[], string>(
  'albums/fetchAll',
  async (id) => {
    const response = await axiosApi.get<Album[]>('/albums?artist=' + id);
    return response.data;
  }
);

export const createAlbum = createAsyncThunk<void, AlbumMutation,{rejectValue: ValidationError}>(
  'albums/create',
  async (albumMutation, {rejectWithValue}) => {
    try {
        const formData = new FormData();
        const keys = Object.keys(albumMutation) as (keyof AlbumMutation)[];

        keys.forEach(key => {
          const value = albumMutation[key];

          if (value !== null) {
            formData.append(key, value);
          }
        });
        await axiosApi.post('/albums', formData);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  }
);

export const publishedAlbum = createAsyncThunk<void, string>(
  'albums/published',
  async (id) => {
    await axiosApi.patch('/albums/' + id + '/togglePublished');
  }
);