import express from "express";
import Album from "../models/Album";
import {imagesUpload} from "../multer";
import mongoose from "mongoose";
import Track from "../models/Track";
import permit from "../middleware/permit";
import auth from "../middleware/auth";

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
  try {
    if (req.query.artist) {
      const albums = await Album.find({artist: req.query.artist}).sort([['yearOfIssue', -1]]).lean();
      const newAlbums = await Promise.all(albums.map(async (album) => {
        const tracks = await Track.find({album: album._id});
        return {
          ...album,
          numberOfTracks: tracks.length
        }
      }));
      return res.send(newAlbums);
    }

    const albums = await Album.find().sort([['yearOfIssue', -1]]);
    const newAlbums = albums.map(async (album) => {
      const tracks = await Track.find({album: album._id});
      return {
        ...album,
        numberOfTracks: tracks.length
      }
    });
    return res.send(newAlbums);
  } catch (e) {
    return next(e);
  }
});

albumsRouter.get('/:id', async (req, res, next) => {
  try {
    const result = await Album.findById(req.params.id).populate('artist');

    if (!result) {
      return res.sendStatus(404);
    }

    return res.send(result);
  } catch (e) {
    return next(e);
  }
});


albumsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  try {
    const album = await Album.create({
      name: req.body.name,
      artist: req.body.artist,
      yearOfIssue: req.body.yearOfIssue,
      image: req.file ? req.file.filename : null,
    });

    return res.send(album);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

albumsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    await Album.deleteOne({_id: req.params.id});
    return res.send({message: 'Deleted'});
  } catch (e) {
    return next(e);
  }
});

export default albumsRouter;