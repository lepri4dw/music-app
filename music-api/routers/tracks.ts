import express from "express";
import Track from "../models/Track";
import mongoose from "mongoose";
import {ITracks} from "../types";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import user from "../middleware/user";

const tracksRouter = express.Router();

tracksRouter.get('/', user, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    if (req.query.album) {
      if (user && user.role === 'admin') {
        const tracks = await Track.find<ITracks>({album: req.query.album}).populate({path: 'album', populate: {path: 'artist', select: 'name'}}).sort('trackNumber');
        if (tracks.length > 0) {
          return res.send({
            tracks: tracks,
            artist: tracks[0].album.artist.name,
            albumName: tracks[0].album.name
          });
        }

        return [];
      }

      const tracks = await Track.find<ITracks>({album: req.query.album, isPublished: true}).populate({path: 'album', populate: {path: 'artist', select: 'name'}}).sort('trackNumber');
      if (tracks.length > 0) {
        return res.send({
          tracks: tracks,
          artist: tracks[0].album.artist.name,
          albumName: tracks[0].album.name
        });
      }

      return [];
    }

    if (user && user.role === 'admin') {
      const tracks = await Track.find();
      return res.send(tracks);
    }

    const tracks = await Track.find({isPublished: true});
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
      trackNumber: parseFloat(req.body.trackNumber),
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

tracksRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const track = await Track.findById(req.params.id);

    if (!track) {
      return res.sendStatus(404);
    }

    await Track.updateOne({_id: req.params.id}, {isPublished: !track.isPublished});
    return res.send({message: 'Artist was published!'});
  } catch (e) {
    return next(e);
  }
});

export default tracksRouter;