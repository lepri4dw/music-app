import { createAsyncThunk } from '@reduxjs/toolkit';
import { Album } from '../../types';
import axiosApi from '../../axiosApi';

export const fetchAlbums = createAsyncThunk<Album[], string>(
  'albums/fetchAll',
  async (id) => {
    const response = await axiosApi.get<Album[]>('/albums?artist=' + id);
    return response.data;
  }
)

export const fetchOneAlbum = createAsyncThunk<Album, string>(
  'albums/fetchOne',
  async (id) => {
    const response = await axiosApi.get<Album>('/albums/' + id);
    return response.data;
  }
)