import express from "express";
import Album from "../models/Album";
import {imagesUpload} from "../multer";
import mongoose, {LeanDocument} from "mongoose";
import Track from "../models/Track";
import permit from "../middleware/permit";
import auth, {RequestWithUser} from "../middleware/auth";
import user from "../middleware/user";
import {IAlbum} from "../types";

const albumsRouter = express.Router();

const getAlbumsWithNumberOfTracks = async (albums: LeanDocument<IAlbum>[], isAdmin: boolean) => {
  return await Promise.all(albums.map(async (album) => {
    if (isAdmin) {
      const tracks = await Track.find({album: album._id});
      return {
        ...album,
        numberOfTracks: tracks.length
      }
    }
    const tracks = await Track.find({album: album._id, isPublished: true});
    return {
      ...album,
      numberOfTracks: tracks.length
    }
  }));
}

albumsRouter.get('/', user, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    if (req.query.artist) {
      if (user && user.role === 'admin') {
        const albums = await Album.find({artist: req.query.artist}).sort([['yearOfIssue', -1]]).lean() as LeanDocument<IAlbum>[];
        const newAlbums = await getAlbumsWithNumberOfTracks(albums, true);

        return res.send(newAlbums);
      }

      const albums = await Album.find({artist: req.query.artist, isPublished: true}).sort([['yearOfIssue', -1]]).lean() as LeanDocument<IAlbum>[];
      const newAlbums = await getAlbumsWithNumberOfTracks(albums, false);
      return res.send(newAlbums);
    }

    if (user && user.role === 'admin') {
      const albums = await Album.find().sort([['yearOfIssue', -1]]).lean() as LeanDocument<IAlbum>[];
      const newAlbums = await getAlbumsWithNumberOfTracks(albums, true);

      return res.send(newAlbums);
    }

    const albums = await Album.find({isPublished: true}).sort([['yearOfIssue', -1]]).lean() as LeanDocument<IAlbum>[];
    const newAlbums = await getAlbumsWithNumberOfTracks(albums, false);

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
      yearOfIssue: parseFloat(req.body.yearOfIssue),
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
    await Track.deleteMany({album: req.params.id});
    await Album.deleteOne({_id: req.params.id});
    return res.send({message: 'Deleted'});
  } catch (e) {
    return next(e);
  }
});

albumsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const album = await Album.findById(req.params.id);

    if (!album) {
      return res.sendStatus(404);
    }

    await Album.updateOne({_id: req.params.id}, {isPublished: !album.isPublished});
    return res.send({message: 'Album was published!'});
  } catch (e) {
    return next(e);
  }
});

export default albumsRouter;