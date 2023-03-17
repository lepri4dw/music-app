import express from "express";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import mongoose from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import user from "../middleware/user";
import Album from "../models/Album";
import Track from "../models/Track";

const artistsRouter = express.Router();

artistsRouter.get('/', user, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    if (user && user.role === 'admin') {
      const artists = await Artist.find();
      return res.send(artists);
    }

    const artists = await Artist.find({isPublished: true});
    return res.send(artists);
  } catch (e) {
    return next(e);
  }
});

artistsRouter.get('/:id', async (req, res, next) => {
  try {
    const result = await Artist.findById(req.params.id);

    if (!result) {
      return res.sendStatus(404);
    }

    return res.send(result);
  } catch (e) {
    return next(e);
  }
});

artistsRouter.post('/', auth, imagesUpload.single('photo'), async (req, res, next) => {
  try {
    const artist = await Artist.create({
      name: req.body.name,
      photo: req.file ? req.file.filename : null,
      info: req.body.info
    });

    return res.send(artist);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

artistsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const albums = await Album.find({artist: req.params.id});
    albums.forEach(async (album) => {
      await Track.deleteMany({album: album._id});
    });
    await Album.deleteMany({artist: req.params.id});
    await Artist.deleteOne({_id: req.params.id});
    return res.send({message: 'Deleted'});
  } catch (e) {
    return next(e);
  }
});

artistsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const artist = await Artist.findById(req.params.id);

    if (!artist) {
      return res.sendStatus(404);
    }

    await Artist.updateOne({_id: req.params.id}, {isPublished: !artist.isPublished});
    return res.send({message: 'Artist was published!'});
  } catch (e) {
    return next(e);
  }
});

export default artistsRouter;