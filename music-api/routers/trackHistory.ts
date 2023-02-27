import express from "express";
import {Error} from "mongoose";
import TrackHistory from "../models/TrackHistory";
import auth, {RequestWithUser} from "../middleware/auth";
import Track from "../models/Track";
import {IFullTrack} from "../types";

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    const track: IFullTrack | null = await Track.findById(req.body.track).populate('album');

    const trackHistory = new TrackHistory({
      user: user._id,
      track: req.body.track,
      datetime: new Date,
      artist: track && track.album.artist
    });

    await trackHistory.save();
    return res.send(trackHistory);
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        return res.sendStatus(400).send(error);
      }

      return next(error);
    }
});

export default trackHistoryRouter;
