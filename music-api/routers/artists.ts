import express from "express";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import mongoose from "mongoose";

const artistsRouter = express.Router();

artistsRouter.get('/', async (req, res, next) => {
  try {
    const artists = await Artist.find();
    return res.send(artists);
  } catch (e) {
    return next(e);
  }
});

artistsRouter.post('/', imagesUpload.single('photo'), async (req, res, next) => {
  const artistData = {
    name: req.body.name,
    photo: req.file ? req.file.filename : null,
    info: req.body.info,
  };

  const artist = new Artist(artistData);

  try {
    await artist.save();
    return res.send(artist);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

export default artistsRouter;