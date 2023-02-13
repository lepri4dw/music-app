import express from "express";
import Album from "../models/Album";
import {imagesUpload} from "../multer";
import mongoose from "mongoose";

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
  try {
    if (req.query.artist) {
      const albums = await Album.find({artist: req.query.artist});
      return res.send(albums);
    }

    const albums = await Album.find();
    return res.send(albums);
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


albumsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  const albumData = {
    name: req.body.name,
    artist: req.body.artist,
    yearOfIssue: req.body.yearOfIssue,
    image: req.file ? req.file.filename : null,
  };

  const album = new Album(albumData);

  try {
    await album.save();
    return res.send(album);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});
export default albumsRouter;