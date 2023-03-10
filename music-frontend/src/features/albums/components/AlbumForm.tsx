import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { CircularProgress, Grid, MenuItem, TextField, Typography } from '@mui/material';
import FileInput from '../../../components/UI/FileInput/FileInput';
import { LoadingButton } from '@mui/lab';
import { selectAlbumCreating, selectCreateAlbumError } from '../albumsSlice';
import { AlbumMutation } from '../../../types';
import { createAlbum } from '../albumsThunks';
import { selectArtists, selectArtistsFetching } from '../../artists/artistsSlice';
import { fetchArtists } from '../../artists/artistsThunks';

const AlbumForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectCreateAlbumError);
  const creating = useAppSelector(selectAlbumCreating);
  const artists = useAppSelector(selectArtists);
  const artistsLoading = useAppSelector(selectArtistsFetching);
  const [state, setState] = useState<AlbumMutation>({
    name: '',
    image: null,
    artist: '',
    yearOfIssue: ''
  });

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  }

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(createAlbum(state)).unwrap();
      navigate('/albums/' + state.artist);
    } catch (e) {

    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    setState(prevState => ({
      ...prevState, [name]: files && files[0] ? files[0] : null,
    }));
  };

  return (
    <form onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <Typography variant="h5">New album</Typography>
        </Grid>

        <Grid item xs>
          <TextField
            label="Artist"
            select name="artist" value={state.artist}
            onChange={inputChangeHandler} required
            error={Boolean(getFieldError('artist'))}
            helperText={getFieldError('artist')}
          >
            <MenuItem value="" disabled>Please select an artist {artistsLoading && <CircularProgress size={20} sx={{ml: 1}}/>}</MenuItem>
            {artists.map(artist => (
              <MenuItem key={artist._id} value={artist._id}>{artist.name}</MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs>
          <TextField
            id="name" label="Name"
            value={state.name}
            onChange={inputChangeHandler}
            name="name" required
            error={Boolean(getFieldError('name'))}
            helperText={getFieldError('name')}
          />
        </Grid>

        <Grid item xs>
          <TextField
            id="yearOfIssue" label="Year Of Issue"
            value={state.yearOfIssue}
            onChange={inputChangeHandler}
            name="yearOfIssue" required
            type="number" InputProps={{inputProps: {min: 1889, max: 2023, step: 1}}}
            error={Boolean(getFieldError('yearOfIssue'))}
            helperText={getFieldError('yearOfIssue')}
          />
        </Grid>

        <Grid item xs>
          <FileInput
            label="Image" onChange={fileInputChangeHandler}
            name="image"
          />
        </Grid>

        <Grid item xs>
          <LoadingButton loadingIndicator="Loading…" loading={creating} type="submit" color="primary" variant="contained">Create</LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default AlbumForm;