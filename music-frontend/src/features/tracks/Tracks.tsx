import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useParams } from 'react-router-dom';
import { selectTracks, selectTracksFetching } from './tracksSlice';
import { fetchTracks } from './tracksThunks';
import { CircularProgress, Grid, Typography } from '@mui/material';
import TrackItem from './components/TrackItem';

const Tracks = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const id = params.id as string;
  const tracksWithArtistAndAlbum = useAppSelector(selectTracks);
  const loading = useAppSelector(selectTracksFetching);

  useEffect(() => {
    dispatch(fetchTracks(id));
  }, [dispatch, id]);

  return (
    <>
      {loading ? <CircularProgress/> : <Grid container direction="column" spacing={2}>
        <Grid item>
          {tracksWithArtistAndAlbum &&  <Typography variant="h4">
            <strong>{tracksWithArtistAndAlbum.albumName}</strong> album of <strong>{tracksWithArtistAndAlbum.artist}</strong>
          </Typography>}
        </Grid>
        <Grid item container spacing={2}>
          {tracksWithArtistAndAlbum && tracksWithArtistAndAlbum.tracks.map(track =>
            (<TrackItem key={track._id} isPublished={track.isPublished} id={track._id} name={track.name} trackNumber={track.trackNumber} length={track.length} youtubeId={track.youtubeId}/>)
          )}
        </Grid>
      </Grid>}
    </>
  );
};

export default Tracks;