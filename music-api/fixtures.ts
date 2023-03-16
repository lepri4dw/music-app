import mongoose from "mongoose";
import config from "./config";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";
import crypto from "crypto";
import User from "./models/User";

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('tracks');
    await db.dropCollection('albums');
    await db.dropCollection('artists');
    await db.dropCollection('users');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  await User.create({
    username: 'vasya@gmail.com',
    password: '12345',
    token: crypto.randomUUID(),
    role: 'admin',
    displayName: 'Vasya',
    avatar: 'fixtures/avatar.png',
  }, {
    username: 'Artem',
    password: 'qwerty123',
    token: crypto.randomUUID(),
    displayName: 'Artem',
  }, {
    username: 'David',
    password: 'a@123456',
    token: crypto.randomUUID(),
    displayName: 'David',
  });

  const [Eminem, Drake, LadyGaGa] = await Artist.create({
    name: 'Eminem',
    photo: 'fixtures/Eminem.jpeg',
    info: '',
    isPublished: true
  }, {
    name: 'Drake',
    photo: 'fixtures/Drake.jpeg',
    info: '',
    isPublished: true
  }, {
    name: 'Lady GaGa',
    photo: 'fixtures/LadyGaGa.jpg',
    info: '',
  });

  const [TakeCare, ThankMeLater, Recovery, TheEminemShow, TheFame] = await Album.create({
    name: 'Take Care',
    artist: Drake._id,
    yearOfIssue: 2011,
    image: 'fixtures/DrakeTakeCare.jpg',
    isPublished: true
  }, {
    name: 'Thank Me Later',
    artist: Drake._id,
    yearOfIssue: 2010,
    image: 'fixtures/DrakeThankMeLater.jpg',
    isPublished: true
  }, {
    name: 'Recovery',
    artist: Eminem._id,
    yearOfIssue: 2010,
    image: 'fixtures/EminemRecovery.jpg',
    isPublished: true
  }, {
    name: 'The Eminem Show',
    artist: Eminem._id,
    yearOfIssue: 2002,
    image: 'fixtures/EminemTheEminemShow.jpg',
    isPublished: true
  }, {
    name: 'The Fame',
    artist: LadyGaGa._id,
    yearOfIssue: 2008,
    image: null
  });

  await Track.create({
    name: 'Over My Dead Body',
    album: TakeCare._id,
    length: '4:33',
    trackNumber: 1,
    youtubeId: 'kAMDVkK9nUE',
    isPublished: true
  }, {
    name: 'Make Me Proud',
    album: TakeCare._id,
    length: '3:40',
    trackNumber: 2,
    youtubeId: '5t5FI7Uqvyg',
    isPublished: true
  }, {
    name: 'Crew Love',
    album: TakeCare._id,
    length: '3:29',
    trackNumber: 4,
    youtubeId: 'QgL33XNLhu0'
  }, {
    name: 'The Motto',
    album: TakeCare._id,
    length: '3:02',
    trackNumber: 3,
    youtubeId: 'BYDKK95cpfM',
    isPublished: true
  }, {
    name: 'Lord Knows',
    album: TakeCare._id,
    length: '5:08',
    trackNumber: 5,
    youtubeId: 'FyBU0JZ3RbY',
    isPublished: true
  }, {
    name: 'Light Up',
    album: ThankMeLater._id,
    length: '4:34',
    trackNumber: 1,
    youtubeId: 'ObUzFn2HyyE'
  }, {
    name: 'Miss Me',
    album: ThankMeLater._id,
    length: '5:06',
    trackNumber: 3,
    youtubeId: 'TRLSQDCkcaA'
  }, {
    name: 'Fireworks',
    album: ThankMeLater._id,
    length: '5:13',
    trackNumber: 4,
    youtubeId: 'ztTGsRfiEjA',
    isPublished: true
  }, {
    name: 'Fancy',
    album: ThankMeLater._id,
    length: '5:19',
    trackNumber: 5,
    youtubeId: 'eZTHCInxt8o',
    isPublished: true
  }, {
    name: 'Up All Night',
    album: ThankMeLater._id,
    length: '3:54',
    trackNumber: 2,
    youtubeId: 'WlC4UJe2FUg',
    isPublished: true
  }, {
    name: 'No Love',
    album: Recovery.id,
    length: '5:00',
    trackNumber: 1,
    youtubeId: 'KV2ssT8lzj8',
    isPublished: true
  }, {
    name: 'On Fire',
    album: Recovery.id,
    length: '3:34',
    trackNumber: 2,
    youtubeId: '0DQispWoIyA',
    isPublished: true
  }, {
    name: 'So Bad',
    album: Recovery.id,
    length: '5:25',
    trackNumber: 3,
    youtubeId: 'wImiwU6lsUI',
    isPublished: true
  }, {
    name: '25 to Life',
    album: Recovery.id,
    length: '4:02',
    trackNumber: 4,
    youtubeId: 'BHUCIs-aJzo',
    isPublished: true
  }, {
    name: 'Love The Way You Lie',
    album: Recovery.id,
    length: '4:23',
    trackNumber: 5,
    youtubeId: 'uelHwf8o7_U',
    isPublished: true
  },{
    name: 'Curtains Close',
    album: TheEminemShow._id,
    length: '1:03',
    trackNumber: 1,
    youtubeId: 'lziCT7Sqp7Y',
    isPublished: true
  }, {
    name: 'Business',
    album: TheEminemShow._id,
    length: '4:12',
    trackNumber: 2,
    youtubeId: 'IdS3WVYr834',
    isPublished: true
  }, {
    name: 'Without me',
    album: TheEminemShow._id,
    length: '4:50',
    trackNumber: 3,
    youtubeId: 'YVkUvmDQ3HY',
    isPublished: true
  }, {
    name: 'Say What You Say',
    album: TheEminemShow._id,
    length: '5:10',
    trackNumber: 4,
    youtubeId: 'LZ9AzJZKe7I',
    isPublished: true
  }, {
    name: 'Superman',
    album: TheEminemShow._id,
    length: '5:50',
    trackNumber: 5,
    youtubeId: 'Mx_yZk47YN4',
    isPublished: true
  }, {
    name: 'Starstruck',
    album: TheFame._id,
    length: '3:37',
    trackNumber: 1,
    youtubeId: 'tVRgVpqQCtc'
  }, {
    name: 'Just Dance',
    album: TheFame._id,
    length: '4:02',
    trackNumber: 3,
    youtubeId: 'VgdGDR15qgs'
  }, {
    name: 'Poker Face',
    album: TheFame._id,
    length: '3:37',
    trackNumber: 2,
    youtubeId: 'bESGLojNYSo'
  }, );

  await db.close();
};

run().catch(console.error);