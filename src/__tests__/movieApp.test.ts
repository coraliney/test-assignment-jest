/**
 * @jest-environment jsdom
 */
import { resolveObjectURL } from "buffer";
import { movieSort } from "../ts/functions";
import { IOmdbResponse } from "../ts/models/IOmdbResponse";
import { IMovie } from "../ts/models/Movie";
import { getData } from "../ts/services/movieservice";
import * as movieAppFunctions from "./../ts/movieApp";
import * as movieserviceFunction from "./../ts/services/movieservice";
import * as msfunction from "../ts/services/movieservice";
jest.mock("./../ts/services/movieservice.ts");

//FÖRSTA TESTET
test("should be able to call fn handleSubmit", () => {
  //arrange
  let spy = jest.spyOn(movieAppFunctions, "handleSubmit").mockReturnValue(
    new Promise((resolve) => {
      resolve();
    })
  ); //varför inte mockReturnValue?

  document.body.innerHTML = ` 
   <form id="searchForm"> 
   <button type="submit" id= "search">Sök</button> 
   </form>`;
  movieAppFunctions.init();

  //act
  (document.getElementById("searchForm") as HTMLFormElement)?.submit();

  //assert
  expect(spy).toHaveBeenCalled();
  document.body.innerHTML = "";
});

//ANDRA TESTET
test("Should handle given data", async () => {
  //arrange
  document.body.innerHTML = "";
  document.body.innerHTML = `    <form id="searchForm">
    <input type="text" id="searchText" placeholder="Skriv titel här" value="star" />
    <button type="submit" id="search">Sök</button>
  </form>
  <div id="movie-container"></div>
  `;

  let spy = jest.spyOn(movieAppFunctions, "createHtml").mockReturnValue();

  //act
  await movieAppFunctions.handleSubmit();

  //assert
  expect(spy).toHaveBeenCalled(); //With(movieAppFunctions, container);
  let searchText: string = (document.body.innerHTML = "");
});

//TREDJE TESTET
test("Should handle given data", async () => {
  //arrange
  document.body.innerHTML = "";
  document.body.innerHTML = `    <form id="searchForm">
      <input type="text" id="searchText" placeholder="Skriv titel här" value="star" />
      <button type="submit" id="search">Sök</button>
    </form>
    <div id="movie-container"></div>
    `;

  let searchTextTxt: string = (
    document.getElementById("searchText") as HTMLInputElement
  ).value;
  let container = document.getElementById("movie-container") as HTMLDivElement;
  let spy = jest.spyOn(movieAppFunctions, "displayNoResult");
  let movies: IMovie[] = [];

  movieAppFunctions.handleSubmit();

  //act
  /*   try {
    movies = await getData(searchTextTxt);
  } catch {
    //assert */
  expect(container.innerHTML).toBe("Finns ingenting här");
  expect(spy).toHaveBeenCalled();
  /*   }
}); */
});

describe("init-fn-innitttt", () => {
  test("should run handlesubmitfn when clickevent occ.", () => {
    // Arrange

    expect.assertions(1);

    let sneakyS = jest
      .spyOn(movieAppFunctions, "handleSubmit")
      .mockImplementation(
        () =>
          new Promise((resolve) => {
            resolve();
          })
      );

    document.body.innerHTML = `<form id="searchForm">
      <input type="text" id="searchText" placeholder="Skriv titel här" />
      <button type="submit" id="search">Sök</button>
      </form>`;
    movieAppFunctions.init();

    //Act
    document.getElementById("search")?.click();

    //Assert
    expect(sneakyS).toHaveBeenCalled();

    document.body.innerHTML = "";
  });
});
describe("handleSubmit-function connected to if/else", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

  test("should run the createhtml-function, i.e. resolve-ish, i.e. list contains actual movies", async () => {
    //Arrange

    document.body.innerHTML = `<form id="searchForm">
      <input type="text" id="searchText" value="Falling" placeholder="Skriv titel här" />
      <button type="submit" id="search">Sök</button>
      </form>
      <div id="movie-container"></div>`;
    let sneakyS = jest.spyOn(movieAppFunctions, "createHtml").mockReturnValue();

    //Act
    await movieAppFunctions.handleSubmit();

    //Assert
    expect(sneakyS).toHaveBeenCalled();

    document.body.innerHTML = "";
  });

  test("should run displaynores, i.e. the catch", async () => {
    //arr
    document.body.innerHTML = `<form id="searchForm">
      <input type="text" id="searchText" value="" placeholder="Skriv titel här" />
      <button type="submit" id="search">Sök</button>
      </form>
      <div id="movie-container"></div>`;

    let sneakyS = jest
      .spyOn(movieAppFunctions, "displayNoResult")
      .mockReturnValue();

    //act
    await movieAppFunctions.handleSubmit();

    //ass
    expect(sneakyS).toHaveBeenCalled();
    document.body.innerHTML = "";
  });
});

test("should createhtml", async () => {
  //arrange

  document.body.innerHTML = `<div id="movie-container"></div>`; // container for the movies that are to be displayed in one div/movie-container

  let container: HTMLDivElement = document.getElementById(
    "movie-container"
  ) as HTMLDivElement; // the containerdiv

  let searchText: string = "Falling Down";

  let movies = await movieserviceFunction.getData(searchText);

  //act

  await movieAppFunctions.createHtml(movies, container);

  // assert

  expect(document.querySelectorAll("div.movie").length).toBe(3);
});
