export interface IUser {
  username: string;
  password: string;
  token: string;
}

export interface ITrackHistory {
  user: string;
  track: string;
  datetime: string;
}
