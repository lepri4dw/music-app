import mongoose from "mongoose";
import config from "./config";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('tracks');
    await db.dropCollection('albums');
    await db.dropCollection('artists');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [Eminem, Drake] = await Artist.create({
    name: 'Eminem',
    photo: 'fixtures/Eminem.jpeg',
    info: ''
  }, {
    name: 'Drake',
    photo: 'fixtures/Drake.jpeg',
    info: ''
  });

  const [TakeCare, ThankMeLater, Recovery, TheEminemShow] = await Album.create({
    name: 'Take Care',
    artist: Drake._id,
    yearOfIssue: 2011,
    image: 'fixtures/DrakeTakeCare.jpg'
  }, {
    name: 'Thank Me Later',
    artist: Drake._id,
    yearOfIssue: 2010,
    image: 'fixtures/DrakeThankMeLater.jpg'
  }, {
    name: 'Recovery',
    artist: Eminem._id,
    yearOfIssue: 2010,
    image: 'fixtures/EminemRecovery.jpg'
  }, {
    name: 'The Eminem Show',
    artist: Eminem._id,
    yearOfIssue: 2002,
    image: 'fixtures/EminemTheEminemShow.jpg'
  });

  await Track.create({
    name: 'Over My Dead Body',
    album: TakeCare._id,
    length: '4:33',
    trackNumber: 1,
    youtubeId: 'kAMDVkK9nUE'
  }, {
    name: 'Make Me Proud',
    album: TakeCare._id,
    length: '3:40',
    trackNumber: 2,
    youtubeId: '5t5FI7Uqvyg'
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
    youtubeId: 'BYDKK95cpfM'
  }, {
    name: 'Lord Knows',
    album: TakeCare._id,
    length: '5:08',
    trackNumber: 5,
    youtubeId: 'FyBU0JZ3RbY'
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
    youtubeId: 'ztTGsRfiEjA'
  }, {
    name: 'Fancy',
    album: ThankMeLater._id,
    length: '5:19',
    trackNumber: 5,
    youtubeId: 'eZTHCInxt8o'
  }, {
    name: 'Up All Night',
    album: ThankMeLater._id,
    length: '3:54',
    trackNumber: 2,
    youtubeId: 'WlC4UJe2FUg'
  }, {
    name: 'No Love',
    album: Recovery.id,
    length: '5:00',
    trackNumber: 1,
    youtubeId: 'KV2ssT8lzj8'
  }, {
    name: 'On Fire',
    album: Recovery.id,
    length: '3:34',
    trackNumber: 2,
    youtubeId: '0DQispWoIyA'
  }, {
    name: 'So Bad',
    album: Recovery.id,
    length: '5:25',
    trackNumber: 3,
    youtubeId: 'wImiwU6lsUI'
  }, {
    name: '25 to Life',
    album: Recovery.id,
    length: '4:02',
    trackNumber: 4,
    youtubeId: 'BHUCIs-aJzo'
  }, {
    name: 'Love The Way You Lie',
    album: Recovery.id,
    length: '4:23',
    trackNumber: 5,
    youtubeId: 'uelHwf8o7_U'
  },{
    name: 'Curtains Close',
    album: TheEminemShow._id,
    length: '1:03',
    trackNumber: 1,
    youtubeId: 'lziCT7Sqp7Y'
  }, {
    name: 'Business',
    album: TheEminemShow._id,
    length: '4:12',
    trackNumber: 2,
    youtubeId: 'IdS3WVYr834'
  }, {
    name: 'Without me',
    album: TheEminemShow._id,
    length: '4:50',
    trackNumber: 3,
    youtubeId: 'YVkUvmDQ3HY'
  }, {
    name: 'Say What You Say',
    album: TheEminemShow._id,
    length: '5:10',
    trackNumber: 4,
    youtubeId: 'LZ9AzJZKe7I'
  }, {
    name: 'Superman',
    album: TheEminemShow._id,
    length: '5:50',
    trackNumber: 5,
    youtubeId: 'Mx_yZk47YN4'
  });

  await db.close();
};

run().catch(console.error);