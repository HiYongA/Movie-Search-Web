// 영화 제목을 검색하여 필터링하는 함수
export let searchMovies = (movieTitle) => {
  const container = document.querySelector("#container");
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
