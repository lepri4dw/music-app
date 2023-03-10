import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Artist, ArtistMutation, ValidationError } from '../../types';
import { isAxiosError } from 'axios';

export const fetchArtists = createAsyncThunk(
  'artists/fetchAll',
  async () => {
    const response = await axiosApi.get<Artist[]>('/artists');
    return response.data;
  }
);

export const fetchOneArtist = createAsyncThunk<Artist, string>(
  'artists/fetchOne',
  async (id) => {
    const response = await axiosApi.get('/artists/' + id);
    return response.data;
  }
);

export const createArtist = createAsyncThunk<void, ArtistMutation, {rejectValue: ValidationError}>(
  'artists/create',
  async (artistMutation, {rejectWithValue}) => {
    try {
      const formData = new FormData();
      const keys = Object.keys(artistMutation) as (keyof ArtistMutation)[];

      keys.forEach(key => {
        const value = artistMutation[key];

        if (value !== null) {
          formData.append(key, value);
        }
      });
      await axiosApi.post('/artists', formData);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  }
);