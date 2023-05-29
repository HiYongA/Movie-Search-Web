const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTA4MGFiOGE3OWFhMzBhMjJhODY4YzRlNjVmMmVjZiIsInN1YiI6IjY0NzBiY2FjMzM2ZTAxMDBjNzA3YWI3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oHfujqBJrauIoqjnRmpZKBIuBh2DIE_r2ffs4F37NPk",
  },
};

fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((data) => {
    let rows = data["results"];
    for (let i = 0; i < rows.length; i++) {
      let img = rows[i].poster_path;
      let title = rows[i].title;
      let rating = rows[i].vote_average;
      let overview = rows[i].overview;
      // console.log(`${rows[i].poster_path}`);

      // TMDB API data에서 img를 가져오려면,
      // https://image.tmdb.org/t/p/<이미지 크기>/<이미지 파일명> 경로로 가져올 수 있다.
      let temp_html = `<div class="movie">
                      <span>⭐︎ ${rating}</span>
                        <img
                          src="https://image.tmdb.org/t/p/w500${img}"
                          alt="..."
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
      document.querySelector("#container").innerHTML += temp_html;
    }
  })
  .catch((err) => console.error(err));
