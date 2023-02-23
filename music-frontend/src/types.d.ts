export interface Artist {
  _id: string;
  name: string;
  photo: string;
  info: string;
}

export interface Album {
  _id: string;
  name: string;
  image: string;
  artist: Artist;
  yearOfIssue: number;

}