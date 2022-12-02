/**

 * @jest-environment jsdom

 */

import { IMovie } from "../ts/models/Movie";
import { getData } from "../ts/services/movieservice";
import { mockData } from "../ts/services/__mocks__/movieservice";

jest.mock("axios", () => ({
  get: async (searchText: string) => {
    return new Promise((resolve, reject) => {
      let stringQuery: string = searchText;
      let url: URLSearchParams = new URLSearchParams(stringQuery);
      let t = url.get("t");
      let newSearchText: string = `${t}`;

      if (newSearchText.length > 3) {
        resolve({ movie: { Search: mockData } });
      } else {
        reject({ movie: [] });
      }
    });
  },
}));

describe("getDatafn", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

  test("should get the mockData", async () => {
    //arr

    expect.assertions(3);
    let searchText: string = "Falling Down";

    //act
    let movies: IMovie[] = await getData(searchText);

    //assert
    expect(movies.length).toBe(3);
  });

  test("should not get the mockData", async () => {
    //arr

    let searchText: string = "";

    //act
    try {
      await getData(searchText);
    } catch (movie: any) {
      //assert

      expect(movie.data.length).toBe(0);
    }
  });
});
