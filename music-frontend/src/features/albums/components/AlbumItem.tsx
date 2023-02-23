import React from 'react';

import { Card, CardActionArea, CardContent, CardHeader, CardMedia, Grid, styled } from '@mui/material';
import noImageAvailable from '../../../assets/images/noImageAvailable.png';
import { apiURL } from '../../../constants';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%', // 16:9
});

interface Props {
  name: string;
  _id: string;
  image: string | null;
  yearOfIssue: number;
}

const AlbumItem: React.FC<Props> = ({name, _id, image, yearOfIssue}) => {
  let cardImage = noImageAvailable;

  if (image) {
    cardImage = apiURL + '/' + image;
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card>
        <CardActionArea>
          <CardHeader title={name}/>
          <ImageCardMedia image={cardImage} title={name}/>
          <CardContent>
            <p>
              <strong>Year:</strong> {yearOfIssue}
            </p>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default AlbumItem;