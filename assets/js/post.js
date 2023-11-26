// 카테고리 가져오기
const fetchCategory = async () => {
  const response = await fetch(`http://localhost:3000/api/category`);
  const responseData = await response.json();
  return responseData;
};

// 게시글 생성 함수
const post_create_btnBtn = document.getElementById('post_create_btn');

post_create_btnBtn.addEventListener('click', async () => {
  const post_modal = document.getElementById('post_modal');
  const post_confirm_btn = document.getElementById('create_btn');
  const post_cancel_btn = document.getElementById('cancel_btn');
  const post_genre = document.getElementById('post_genre');

  post_modal.style.display = 'block';

  post_cancel_btn.addEventListener('click', () => {
    post_modal.style.display = 'none';
  });
  // 카테고리 함수 변수에 두기
  const genre = await fetchCategory();

  // 카테고리 별 드랍메뉴에  option값으로 넣어주기
  post_genre.innerHTML = '';
  for (let g of genre.category) {
    const option = document.createElement('option');
    option.value = g;
    option.textContent = g;
    option.classList.add('genre');
    post_genre.appendChild(option);
  }

  // 생성 버튼 누르면 추가 해준다.
  post_confirm_btn.addEventListener('click', async () => {
    try {
      const post_title = document.getElementById('post_title').value;
      const post_body = document.getElementById('post_body').value;
      // option 값 node로 전체 다 받아옴.
      const post_genre = document.querySelectorAll('.genre');

      // option 값 배열로 만든 후 selected 값 필터로 구분 후 map 함수로 value 값 반환
      const selectedGenres = Array.from(post_genre)
        .filter((option) => {
          return option.selected;
        })
        .map((option) => {
          return option.value;
        });

      if (!post_title || !post_body || !selectedGenres.length) {
        return alert('빈칸을 채워주세요');
      }
      // 선택 된 값 genre에 넣어주기
      const newPost = {
        title: post_title,
        body: post_body,
        genre: selectedGenres[0],
      };
      // 게시글 생성 api
      const response = await fetch('http://localhost:3000/api/auth/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      const responseData = await response.json();

      post_modal.style.display = 'none';
      alert(responseData.message);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  });
});

// 게시글 수정

// 게시글 삭제

export const generateMovieDetail = async () => {
  // URL에서 쿼리 문자열을 가져옵니다
  let queryString = window.location.search;
  // URLSearchParams 객체를 사용하여 쿼리 문자열을 파싱합니다
  let searchParams = new URLSearchParams(queryString);
  // detail_id 매개변수의 값을 가져옵니다
  let detailId = parseInt(searchParams.get('detail_id'));
  // id값이 주소 detail_id와 같은 영화디테일 데이터 가져오기
  const detail = await fetchDetailData(detailId);
  // 널을 공간 id DOM
  const detailCont = document.querySelector('#detail_cont');
  console.log(detail);
  detailCont.innerHTML = `
    <figure>
      <img src="https://image.tmdb.org/t/p/w500${detail.poster_path}" alt="${
    detail.title
  } 포스트이미지" />
    </figure>
    <div class="detail_txt_cont">
      <div class="detail_tit">
        <h2>${detail.title}</h2>
        <p>${detail.original_title}, ${
    detail.title
  }, ${detail.release_date.slice(0, 4)}</p>
      </div>
      <div class="detail_cont">
        <dl class="list_cont">
          <dt>개봉</dt>
          <dd>${detail.release_date}</dd>
        </dl>
        <dl class="list_cont">
          <dt>장르</dt>
          <dd>${detail.genres.map((item) => item.name)}</dd>
        </dl>
        <dl class="list_cont">
          <dt>국가</dt>
          <dd>${detail.production_countries[0].name}</dd>
        </dl>
        <dl class="list_cont">
          <dt>평점</dt>
          <dd><span class="ico_movie ico_star"></span>${detail.vote_average.toFixed(
            1,
          )}</dd>
        </dl>
        <dl class="list_cont">
          <dt>언어</dt>
          <dd>${detail.spoken_languages[0].name}</dd>
        </dl>
        <dl class="list_cont">
          <dt>러닝타임</dt>
          <dd>${detail.runtime}분</dd>
        </dl>
        <dl class="list_cont">
          <dt>줄거리</dt>
          <dd>${detail.overview ? detail.overview : '내용 없음'}</dd>
        </dl>
      </div>
    </div>
  `;
};
async function fetchDetailData(movie_id) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MGI2YTY4OWQ1NTMwNTAyYmQ3MmVlNjY4NWJlMDUzOCIsInN1YiI6IjY0ZmUzOGZjYzNiZmZlMDEwMTI5NDAwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WxRRqtG5TE7NPS7X8Pfn100g3ozzHAiLzN_WB8g1HS4',
    },
  };
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}?language=ko-KR`,
    options,
  );
  const data = await response.json();
  return data;
}
