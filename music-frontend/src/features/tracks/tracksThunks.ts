import { createAsyncThunk } from '@reduxjs/toolkit';
import { Track } from '../../types';
import axiosApi from '../../axiosApi';

export const fetchTracks = createAsyncThunk<Track[], string>(
  'tracks/fetchAll',
  async (id) => {
    const response = await axiosApi.get<Track[]>('/tracks?album=' + id);
    return response.data;
  }
);