import { movieCardList } from "./movie.js";
import { searchMovies } from "./search.js";

const searchForm = document.querySelector("#search-form");
const searchInput = searchForm.querySelector("input");

// Input submit 이벤트 리스너
let handleTitleSubmit = (event) => {
  event.preventDefault();
  const movieTitle = searchInput.value.toLowerCase();
  searchInput.value = "";
  searchMovies(movieTitle);
};

searchForm.addEventListener("submit", handleTitleSubmit);

movieCardList();
