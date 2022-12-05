import { IMovie } from "../../models/Movie";

export const mockData: IMovie[] = [
  {
    Title: "Falling Down",
    imdbID: "1",
    Type: "movie",
    Poster: "url",
    Year: "2000",
  },

  { Title: "Drive", imdbID: "2", Type: "movie", Poster: "url", Year: "2001" },
  { Title: "Matrix", imdbID: "3", Type: "movie", Poster: "url", Year: "2002" },
];

export const getData = async (searchText: string): Promise<IMovie[]> => {
  return new Promise((resolve, reject) => {
    if (searchText.length > 0) {
      resolve(mockData);
    } else {
      reject(); // lägg in error?
    }
  });
};
