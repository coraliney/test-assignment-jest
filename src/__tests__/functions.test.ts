import { movieSort } from "../ts/functions";
import { mockData } from "../ts/services/__mocks__/movieservice";

test("should sort movietitles a-ö", () => {
  //arrange

  //act
  movieSort(mockData, true);

  //assert
  expect(mockData[0].Title).toBe("Drive");
  expect(mockData[2].Title).toBe("Matrix");
});

test("should sort movietitles ö-a", () => {
  //arrange

  //act
  movieSort(mockData, false);

  //assert
  expect(mockData[0].Title).toBe("Matrix");

  expect(mockData[2].Title).toBe("Drive");
});
