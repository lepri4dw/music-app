import express from "express";
import Track from "../models/Track";
import mongoose from "mongoose";

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res, next) => {
  try {
    if (req.query.album) {
      const tracks = await Track.find({album: req.query.album});
      return res.send(tracks);
    }

    const tracks = await Track.find();
    return res.send(tracks);
  } catch (e) {
    return next(e);
  }
});

tracksRouter.post('/', async (req, res, next) => {
  const trackData = {
    name: req.body.name,
    album: req.body.album,
    length: req.body.length
  };

  const track = new Track(trackData);

  try {
    await track.save();
    return res.send(track);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

export default tracksRouter;