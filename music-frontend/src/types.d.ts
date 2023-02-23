export interface Artist {
  _id: string;
  name: string;
  photo: string;
  info: string;
}

export interface Album {
  _id: string;
  name: string;
  image: string;
  artist: Artist;
  yearOfIssue: number;
}

export interface Track {
  _id: string;
  name: string;
  album: string;
  length: string;
  trackNumber: number;
}