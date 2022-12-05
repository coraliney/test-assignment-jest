/**
 * @jest-environment jsdom
 */

import { getData } from "../ts/services/movieservice";
import { mockData } from "../ts/services/__mocks__/movieservice";

//TEST-
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

//TEST-
test("should not get the mockData", async () => {
  //arrange
  let searchText: string = "";
  //act
  try {
    await getData(searchText);
  } catch (movie: any) {
    //assert
    expect(movie.data.length).toBe(0);
  }
});
