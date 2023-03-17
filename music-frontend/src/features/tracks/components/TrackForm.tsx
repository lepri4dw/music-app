import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { CircularProgress, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { TrackMutation } from '../../../types';
import { selectArtists, selectArtistsFetching } from '../../artists/artistsSlice';
import { fetchArtists } from '../../artists/artistsThunks';
import { selectCreateTrackError, selectTrackCreating } from '../tracksSlice';
import { selectAlbums, selectAlbumsFetching } from '../../albums/albumsSlice';
import { fetchAlbums } from '../../albums/albumsThunks';
import { createTrack } from '../tracksThunks';

const TrackForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectCreateTrackError);
  const creating = useAppSelector(selectTrackCreating);
  const albums = useAppSelector(selectAlbums);
  const artists = useAppSelector(selectArtists);
  const artistsLoading = useAppSelector(selectArtistsFetching);
  const albumsLoading = useAppSelector(selectAlbumsFetching);
  const [artistState, setArtistState] = useState('');
  const [state, setState] = useState<TrackMutation>({
    name: '',
    album: '',
    length: '',
    trackNumber: '',
    youtubeId: '',
  });
  
  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(fetchAlbums(artistState));
  }, [dispatch, artistState]);

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
      await dispatch(createTrack(state)).unwrap();
      navigate('/tracks/' + state.album);
    } catch (e) {

    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };
  
  const artistInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    setArtistState(value);
  }

  return (
    <form onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <Typography variant="h5">New track</Typography>
        </Grid>

        <Grid item xs>
          <TextField
            label="Artist"
            select name="artist" value={artistState}
            onChange={artistInputChangeHandler}
          >
            <MenuItem value="" disabled>Please select an artist {artistsLoading && <CircularProgress size={20} sx={{ml: 1}}/>}</MenuItem>
            {artists.map(artist => (
              <MenuItem key={artist._id} value={artist._id}>{artist.name}</MenuItem>
            ))}
          </TextField>
        </Grid>
        
        <Grid item xs>
          <TextField
            label="Album"
            select name="album" value={state.album}
            onChange={inputChangeHandler} required
            error={Boolean(getFieldError('album'))}
            helperText={getFieldError('album')}
          >
            <MenuItem value="" disabled>Please select an album {albumsLoading && <CircularProgress size={20} sx={{ml: 1}}/>}</MenuItem>
            {albums.map(album => (
              <MenuItem key={album._id} value={album._id}>{album.name}</MenuItem>
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
            id="length" label="Length"
            value={state.length}
            onChange={inputChangeHandler}
            name="length" required InputProps={{inputProps: {pattern: "^\\d{2}:\\d{2}$", title: 'Enter a valid track length in the format of mm:ss'}}}
            error={Boolean(getFieldError('length'))}
            helperText={getFieldError('length')}
          />
        </Grid>

        <Grid item xs>
          <TextField
            id="trackNumber" label="Track Number"
            value={state.trackNumber}
            onChange={inputChangeHandler}
            name="trackNumber" required
            type="number" InputProps={{inputProps: {min: 1, step: 1}}}
            error={Boolean(getFieldError('trackNumber'))}
            helperText={getFieldError('trackNumber')}
          />
        </Grid>

        <Grid item xs>
          <TextField
            id="youtubeId" label="Youtube ID"
            value={state.youtubeId}
            onChange={inputChangeHandler}
            name="youtubeId" required
            error={Boolean(getFieldError('youtubeId'))}
            helperText={getFieldError('youtubeId')}
          />
        </Grid>

        <Grid item xs>
          <LoadingButton loadingIndicator="Loading…" loading={creating} type="submit" color="primary" variant="contained">Create</LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default TrackForm;