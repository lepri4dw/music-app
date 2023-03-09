import express from "express";
import Track from "../models/Track";
import mongoose from "mongoose";
import {ITracks} from "../types";
import auth from "../middleware/auth";
import permit from "../middleware/permit";

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res, next) => {
  try {
    if (req.query.album) {
      const tracks = await Track.find<ITracks>({album: req.query.album}).populate({path: 'album', populate: {path: 'artist', select: 'name'}}).sort('trackNumber');
      return res.send({
        tracks: tracks,
        artist: tracks[0].album.artist.name,
        albumName: tracks[0].album.name
      });
    }

    const tracks = await Track.find();
    return res.send(tracks);
  } catch (e) {
    return next(e);
  }
});

tracksRouter.post('/', auth, async (req, res, next) => {
  try {
    const track = await Track.create({
      name: req.body.name,
      album: req.body.album,
      length: req.body.length,
      trackNumber: req.body.trackNumber,
      youtubeId: req.body.youtubeId
    });

    return res.send(track);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

tracksRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    await Track.deleteOne({_id: req.params.id});
    return res.send({message: 'Deleted'});
  } catch (e) {
    return next(e);
  }
});

export default tracksRouter;