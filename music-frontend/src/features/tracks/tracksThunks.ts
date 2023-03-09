import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITracks } from '../../types';
import axiosApi from '../../axiosApi';

export const fetchTracks = createAsyncThunk<ITracks, string>(
  'tracks/fetchAll',
  async (id) => {
    const response = await axiosApi.get<ITracks>('/tracks?album=' + id);
    return response.data;
  }
);