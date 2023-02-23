import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectAlbums, selectAlbumsFetching } from './albumsSlice';
import { fetchAlbums } from './albumsThunks';
import { useParams } from 'react-router-dom';
import { CircularProgress, Grid, Typography } from '@mui/material';
import AlbumItem from './components/AlbumItem';
import { selectOneArtist, selectOneArtistFetching } from '../artists/artistsSlice';
import { fetchOneArtist } from '../artists/artistsThunks';

const Albums = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const id = params.id as string;
  const albums = useAppSelector(selectAlbums);
  const loading = useAppSelector(selectAlbumsFetching);
  const artist = useAppSelector(selectOneArtist);
  const artistLoading = useAppSelector(selectOneArtistFetching);

  useEffect(() => {
    dispatch(fetchOneArtist(id));
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchAlbums(id));
  }, [dispatch]);

  return (
    <>
      {artistLoading || loading ? <CircularProgress/> : <Grid container direction="column" spacing={2}>
        <Grid item>
          {artist && <Typography variant="h4">
            <strong>{artist.name}</strong> albums:
          </Typography>}
        </Grid>
        <Grid item container spacing={2}>
          {albums.map(album => (
            <AlbumItem key={album._id} name={album.name} _id={album._id} image={album.image} yearOfIssue={album.yearOfIssue}/>
          ))}
        </Grid>
      </Grid>}
    </>

  );
};

export default Albums;