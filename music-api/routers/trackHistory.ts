import express from "express";
import {Error} from "mongoose";
import User from "../models/User";
import TrackHistory from "../models/TrackHistory";

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', async (req, res, next) => {
  try {
    const token = req.get('Authorization');

    if (!token) {
      return res.status(401).send({error: 'No token present'});
    }

    const user = await User.findOne({token});

    if (!user) {
      return res.status(401).send({error: 'Wrong token!'});
    }

    if (!req.body.track) {
      return res.status(404).send({error: 'Not Found!'});
    }

    const trackHistory = new TrackHistory({
      user: user._id,
      track: req.body.track,
      datetime: new Date,
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
