import {Schema} from "mongoose";

export interface IUser {
  username: string;
  password: string;
  token: string;
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
  youtubeId: string;
}