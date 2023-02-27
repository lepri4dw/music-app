import {Schema} from "mongoose";

export interface IUser {
  username: string;
  password: string;
  token: string;
}

export interface IAlbum {
  name: string;
  artist: Schema.Types.ObjectId;
  yearOfIssue: number;
  image: string;
}

export interface ITrack {
  name: string;
  album: Schema.Types.ObjectId;
  length: string;
  trackNumber: number;
}

export interface IFullTrack {
  _id: Schema.Types.ObjectId;
  length: string;
  album: {
    artist: Schema.Types.ObjectId;
    name: string;
    image: string;
    yearOfIssue: number;
  }
  name: string;
  trackNumber: number;
}