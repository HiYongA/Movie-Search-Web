const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTA4MGFiOGE3OWFhMzBhMjJhODY4YzRlNjVmMmVjZiIsInN1YiI6IjY0NzBiY2FjMzM2ZTAxMDBjNzA3YWI3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oHfujqBJrauIoqjnRmpZKBIuBh2DIE_r2ffs4F37NPk",
  },
};
const container = document.querySelector("#container");
const searchForm = document.querySelector("#search-form");
const searchInput = searchForm.querySelector("input");

fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((data) => {
    const rows = data["results"];
    console.log(data);
    rows.map((movie) => {
      let img = movie.poster_path;
      let title = movie.title;
      let rating = movie.vote_average;
      let overview = movie.overview;
      let id = movie.id;
      // TMDB API data에서 img를 가져오려면,
      // https://image.tmdb.org/t/p/<이미지 크기>/<이미지 파일명> 경로로 가져올 수 있다.
      // 카드 클릭 시 클릭한 영화 id를 나타내는 alert창 띄우기
      let temp_html = `<div class="movie" id=${id}>
                    <span>⭐︎ ${rating}</span>
                      <img
                        src="https://image.tmdb.org/t/p/w500${img}"
                        alt="..."
                        onclick = "alert('영화 ID: ${id}')"
                      />
                      <div class="movie-info">
                        <h3>${title}</h3>
                      </div>
                      <div class="overview">
                        <h3>${title}</h3>
                        <p>${overview}</p>
                      </div>
                    </div>`;
      // id:"container"의 내부 HTML에 temp_html에 저장된 html을 추가한다.
      container.innerHTML += temp_html;
    });

    // 영화 제목을 검색하여 필터링하는 함수
    let searchMovies = (movieTitle) => {
      // 모든 영화 카드 요소를 읽어온다.
      const movieCards = document.querySelectorAll(".movie");
      let searchResults = false;
      movieCards.forEach((card) => {
        const cardTitle = card
          // 문서 객체를 읽어오고,
          .querySelector(".movie-info h3")
          // h3요소인 title을 가져오고, 대문자인 영화 제목이 있기 때문에 대문자를 소문자로 변환해준다.
          .textContent.toLowerCase();
        // includes()문자열 메서드: 주어진 문자열이 다른 문자열에 포함되어 있는지 여부를 확인한다.
        // 영화 제목이 검색어를 포함하면,
        if (cardTitle.includes(movieTitle)) {
          // 해당 카드가 화면에 나타나고,
          card.style.display = "block";
          searchResults = true;
        } else {
          // 아니면 해당 카드를 화면에서 숨긴다.
          card.style.display = "none";
        }
      });
      if (!searchResults) {
        container.innerHTML += `<p id="search-results">관련 검색어가 없습니다.</p>`;
      }
    };

    // Input submit 이벤트 리스너
    let handleTitleSubmit = (event) => {
      event.preventDefault();
      const movieTitle = searchInput.value.toLowerCase();
      searchInput.value = "";
      // console.log(movieTitle);
      searchMovies(movieTitle);
    };

    // 검색창에 검색하고 엔터를 눌렀을 때, 이벤트가 발생한다.
    searchForm.addEventListener("submit", handleTitleSubmit);
  })
  .catch((err) => console.error(err));

// ---------------------- 카드 클릭 시 클릭한 영화 id를 나타내는 alert창 띄우기
// 문서 객체(html->id="movie") 읽어들이기
// const movieCard = document.querySelector("#movie");

// id 속성 값에 랜덤 숫자를 만든 화살표 함수
// 중복 숫자를 줄이기 위해 10000으로 숫자 범위를 늘렸다.
// const randomId = () => Math.floor(Math.random() * 10000);

// setAttribute(attr, value): 해당 요소의 속성 값을 변경한다.
// movieCard.setAttribute("id", randomId());

// ----------------------- 카드 데이터를 내부적으로 하나하나씩 뿌려주기
// 1. forEach()메서드를 사용할 때
// rows.forEach((element, index) => {
//   element.title;
//   console.log(element.title, index);
// });

// 2. for()문 사용할 때
// for (let i = 0; i < rows.length; i++) {
//   let img = rows[i].poster_path;
//   let title = rows[i].title;
//   let rating = rows[i].vote_average;
//   let overview = rows[i].overview;
//   let id = rows[i].id;
//   console.log(`${rows[i].poster_path}`);
// }
