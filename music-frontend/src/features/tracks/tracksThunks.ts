import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITracks, TrackMutation, ValidationError } from '../../types';
import axiosApi from '../../axiosApi';

export const fetchTracks = createAsyncThunk<ITracks, string>(
  'tracks/fetchAll',
  async (id) => {
    const response = await axiosApi.get<ITracks>('/tracks?album=' + id);
    return response.data;
  }
);

export const createTrack = createAsyncThunk<void, TrackMutation, {rejectValue: ValidationError}>(
  'tracks/create',
  async (trackMutation) => {
    await axiosApi.post('/tracks', trackMutation);
  }
);

export const publishedTrack = createAsyncThunk<void, string>(
  'artists/published',
  async (id) => {
    await axiosApi.patch('/tracks/' + id + '/togglePublished');
  }
);