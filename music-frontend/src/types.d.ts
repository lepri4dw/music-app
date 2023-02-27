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

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}