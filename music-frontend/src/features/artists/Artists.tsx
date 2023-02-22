import React, { useEffect } from 'react';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectArtists, selectArtistsFetching } from './artistsSlice';
import ArtistItem from './components/ArtistItem';
import { fetchArtists } from './artistsThunks';

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const loading = useAppSelector(selectArtistsFetching);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch])

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h4">
          Artists
        </Typography>
      </Grid>
      {loading ? <CircularProgress/> : <Grid item container spacing={2}>
        {artists.map(artist => (
          <ArtistItem key={artist._id} name={artist.name} _id={artist._id} photo={artist.photo}/>
        ))}
      </Grid>}
    </Grid>
  );
};

export default Artists;