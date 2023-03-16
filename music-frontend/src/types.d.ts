export interface Artist {
  _id: string;
  name: string;
  photo: string | null;
  isPublished: boolean;
}

export interface ArtistMutation {
  name: string;
  photo: File | null;
}

export interface Album {
  _id: string;
  name: string;
  image: string | null;
  artist: Artist;
  yearOfIssue: number;
  numberOfTracks: number;
  isPublished: boolean;
}

export interface AlbumMutation {
  name: string;
  image: File | null;
  artist: string;
  yearOfIssue: string;
}

export interface Track {
  _id: string;
  name: string;
  album: string;
  length: string;
  trackNumber: number;
  youtubeId: string;
  isPublished: boolean;
}

export interface TrackMutation {
  name: string;
  album: string;
  length: string;
  trackNumber: string;
  youtubeId: string;
}

export interface ITracks {
  tracks: Track[];
  artist: string;
  albumName: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  avatar: File | null;
}

export interface User {
  _id: string;
  username: string;
  token: string;
  role: string;
  displayName: string;
  avatar: string | null;
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

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface GlobalError {
  error: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface ITrackHistory {
  _id: string;
  track: Track;
  artist: Artist;
  user: string;
  datetime: string;
}