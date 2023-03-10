import React from 'react';
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  styled,
  Typography
} from '@mui/material';
import noImageAvailable from '../../../assets/images/noImageAvailable.png';
import { apiURL } from '../../../constants';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchArtists, publishedArtist } from '../artistsThunks';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%', // 16:9
});

interface Props {
  name: string;
  _id: string;
  photo: string | null;
  isPublished: boolean
}

const ArtistItem: React.FC<Props> = ({name, photo, _id, isPublished}) => {
  const dispatch = useAppDispatch();
  let cardImage = noImageAvailable;
  const user = useAppSelector(selectUser);
  if (photo) {
    cardImage = apiURL + '/' + photo;
  }

  const togglePublished = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    await dispatch(publishedArtist(_id));
    dispatch(fetchArtists());
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card component={Link} to={'/albums/' + _id} style={{textDecoration: "none"}}>
        <CardActionArea>
          <ImageCardMedia image={cardImage} title={name}/>
          <CardContent>
            <Typography variant="h6">{name}</Typography>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              {!isPublished && user && user.role === 'admin' && (
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <Typography variant="h6" sx={{pr: '5px'}}>Not publish</Typography>
                  <Button variant="contained" color="primary" onClick={togglePublished}>Publish</Button>
                </div>
              )}
              {user && user.role === 'admin' && (
                <IconButton style={{marginLeft: 'auto'}}>
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

export default ArtistItem;