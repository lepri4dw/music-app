import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useParams } from 'react-router-dom';
import { selectTracks, selectTracksFetching } from './tracksSlice';
import { selectOneArtist, selectOneArtistFetching } from '../artists/artistsSlice';
import { selectOneAlbum, selectOneAlbumFetching } from '../albums/albumsSlice';
import { fetchTracks } from './tracksThunks';
import { fetchOneArtist } from '../artists/artistsThunks';
import { fetchOneAlbum } from '../albums/albumsThunks';
import { CircularProgress, Grid, Typography } from '@mui/material';
import TrackItem from './components/TrackItem';

const Tracks = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const id = params.id as string;
  const artistId = params.artistId as string;
  const tracks = useAppSelector(selectTracks);
  const loading = useAppSelector(selectTracksFetching);
  const artist = useAppSelector(selectOneArtist);
  const artistLoading = useAppSelector(selectOneArtistFetching);
  const album = useAppSelector(selectOneAlbum);
  const albumLoading = useAppSelector(selectOneAlbumFetching);

  useEffect(() => {
    dispatch(fetchTracks(id));
    dispatch(fetchOneArtist(artistId));
    dispatch(fetchOneAlbum(id));
  }, [dispatch]);

  return (
    <>
      {artistLoading || loading || albumLoading ? <CircularProgress/> : <Grid container direction="column" spacing={2}>
        <Grid item>
          {artist && album && <Typography variant="h4">
            <strong>{album.name}</strong> album of <strong>{artist.name}</strong>
          </Typography>}
        </Grid>
        <Grid item container spacing={2}>
          {tracks.map(track => (<TrackItem key={track._id} name={track.name} trackNumber={track.trackNumber} length={track.length}/>))}
        </Grid>
      </Grid>}
    </>
  );
};

export default Tracks;