import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';

export const fetchTrackHistory = createAsyncThunk(
  'trackHistory/fetch',
  async () => {
    const response = await axiosApi.get('/track_history' );
    return response.data;
  }
);

export const createTrackHistory = createAsyncThunk<void, string>(
  'trackHistory/create',
  async (track) => {
    await axiosApi.post('/track_history', {track: track});
  }
);