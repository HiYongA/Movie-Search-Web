export async function getMovies() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTA4MGFiOGE3OWFhMzBhMjJhODY4YzRlNjVmMmVjZiIsInN1YiI6IjY0NzBiY2FjMzM2ZTAxMDBjNzA3YWI3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oHfujqBJrauIoqjnRmpZKBIuBh2DIE_r2ffs4F37NPk",
    },
  };
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  );
  const data = await res.json();
  return data.results;
}

export async function movieCardList() {
  const data = await getMovies();
  data.map((movie) => {
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
}
