const postDetail = async () => {
  // URL에서 쿼리 문자열을 가져옵니다
  let queryString = window.location.search;
  // URLSearchParams 객체를 사용하여 쿼리 문자열을 파싱합니다
  let searchParams = new URLSearchParams(queryString);
  // detail_id 매개변수의 값을 가져옵니다
  let detailId = parseInt(searchParams.get('postId'));

  // id값이 주소 detail_id와 같은 영화디테일 데이터 가져오기
  const detail = await fetchDetailData(detailId);
  const post = detail.post;
  // 널을 공간 id DOM
  const detailCont = document.getElementById('detail_cont');
  const content = document.createElement('div');
  content.classList.add('detail_content');
  content.innerHTML = `
   <div id="post_title">${post.title}</div>
   </br>
   <div id="post_body">${post.body}</div>
   </br>
   <div id="post_genre">${post.genre}</div>
    `;

  detailCont.appendChild(content);
};

async function fetchDetailData(postId) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };
  const response = await fetch(
    `http://localhost:3000/api/post/${postId}`,
    options,
  );
  const data = await response.json();
  return data;
}

postDetail();
