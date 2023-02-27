import mongoose, {Types} from "mongoose";
import Album from "./Album";
import {ITrack} from "../types";

const Schema = mongoose.Schema;

const TrackSchema = new Schema<ITrack>({
  name: {
    type: String,
    required: true,
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: 'Album',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => Album.findById(value),
      message: 'Album does not exist',
    }
  },
  length: {
    type: String,
    required: true,
  },
  trackNumber: {
    type: Number,
    required: true,
  }
});

const Track = mongoose.model('Track', TrackSchema);
export default Track;