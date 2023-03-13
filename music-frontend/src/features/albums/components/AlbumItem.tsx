import React from 'react';

import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  styled,
  Typography
} from '@mui/material';
import noImageAvailable from '../../../assets/images/noImageAvailable.png';
import { apiURL } from '../../../constants';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';
import { deleteAlbum, fetchAlbums, publishedAlbum } from '../albumsThunks';
import { selectAlbumDeleting, selectAlbumPublishing } from '../albumsSlice';
import { LoadingButton } from '@mui/lab';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%', // 16:9
});

interface Props {
  name: string;
  _id: string;
  image: string | null;
  yearOfIssue: number;
  numberOfTracks: number;
  isPublished: boolean;
  artistId: string;
}

const AlbumItem: React.FC<Props> = ({name, _id, image, yearOfIssue, numberOfTracks, isPublished, artistId}) => {
  const dispatch = useAppDispatch();
  let cardImage = noImageAvailable;
  const user = useAppSelector(selectUser);
  const deleteLoading = useAppSelector(selectAlbumDeleting);
  const publishLoading = useAppSelector(selectAlbumPublishing);

  const togglePublished = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    await dispatch(publishedAlbum(_id));
    dispatch(fetchAlbums(artistId));
  }

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    if (window.confirm('Deleting an album will also delete all their tracks. ' +
      'Do you really want to delete this album?')) {
      await dispatch(deleteAlbum(_id));
      dispatch(fetchAlbums(artistId));
    }
  }

  if (image) {
    cardImage = apiURL + '/' + image;
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card component={Link} to={'/tracks/' + _id} style={{textDecoration: "none"}}>
        <CardActionArea>
          <CardHeader title={name}/>
          <ImageCardMedia image={cardImage} title={name}/>
          <CardContent>
            <Typography variant="subtitle1">Year: <strong>{yearOfIssue}</strong></Typography>
            <Typography variant="subtitle1">Number of tracks:  <strong>{numberOfTracks}</strong></Typography>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              {!isPublished && user && user.role === 'admin' && (
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <Typography variant="h6" sx={{pr: '5px'}}>Not publish</Typography>
                  <LoadingButton loadingIndicator="Loading..." loading={publishLoading ? publishLoading === _id : false} variant="contained" color="primary" onClick={togglePublished}>Publish</LoadingButton>
                </div>
              )}
              {user && user.role === 'admin' && (
                <IconButton disabled={deleteLoading ? deleteLoading === _id : false}  style={{marginLeft: 'auto'}} onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
              )}
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default AlbumItem;