import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';

export const fetchArtists = createAsyncThunk(
  'artists/fetchAll',
  async () => {
    const response = await axiosApi.get('/artists');
    return response.data;
  }
);