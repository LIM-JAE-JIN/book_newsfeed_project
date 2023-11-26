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
    <div class="post_title">
    <h2>${post.title}</h2>
    <div style="display:flex; justify-content:space-between; margin-top:30px;">
    <p>작성일 : ${post.createdAt.slice(0, 10)}</p>
    <p>장르 : ${post.genre}</p>
    </div>
    </div>
    <div class="post_body">${post.body}</div>
    <div class="btn_wrap">
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
  console.log(data);
  return data;
}

postDetail();
