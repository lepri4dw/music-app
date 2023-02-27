import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITrackHistory } from '../../types';
import axiosApi from '../../axiosApi';
import { RootState } from '../../app/store';

export const fetchTrackHistory = createAsyncThunk<ITrackHistory[], void, {state: RootState}>(
  'trackHistory/fetch',
  async (_, {getState}) => {
    const user = getState().users.user;

    if (user) {
      const response = await axiosApi.get('/track_history', {headers: {'Authorization': user.token}});
      return response.data;
    }
  }
);

export const createTrackHistory = createAsyncThunk<void, string, {state: RootState}>(
  'trackHistory/create',
  async (track, {getState}) => {
    const user = getState().users.user;

    if (user) {
      return axiosApi.post('/track_history', {track: track}, {headers: {'Authorization': user.token}});
    }
  }
);