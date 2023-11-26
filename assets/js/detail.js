// detail.js 확인

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
    <div id="post_deleteAndEdit_btn"></div>
    `;
  detailCont.appendChild(content);

  const post_deleteAndEdit_btn = document.getElementById(
    'post_deleteAndEdit_btn',
  );

  // 게시글 삭제 버튼
  const post_delete_btn = document.createElement('button');
  post_delete_btn.classList.add('post_delete_btn');
  post_delete_btn.innerHTML = '삭제';

  // 게시글 수정 버튼
  const post_edit_btn = document.createElement('button');
  post_edit_btn.classList.add('post_edit_btn');
  post_edit_btn.innerHTML = '수정';

  post_deleteAndEdit_btn.append(post_edit_btn, post_delete_btn);
  // userId가 다르면 수정, 삭제 버튼 숨김
  if (detail.post.userId === detail.userId) {
    post_delete_btn.style.display = 'block';
    post_edit_btn.style.display = 'block';
  } else {
    post_delete_btn.style.display = 'none';
    post_edit_btn.style.display = 'none';
  }

  // 게시글 수정 버튼 클릭 시 함수 실행
  post_edit_btn.addEventListener('click', async () => {
    const postId = post.postId;
    const post_modal = document.createElement('div');
    post_modal.classList.add('post_modal');
    const detail_update_modal = document.getElementById('detail_update_modal');
    // 업데이트 포스트 모달

    detail_update_modal.innerHTML = '';

    post_modal.innerHTML = `
      <label for="update_title">제목:</label>
      <input type="text" id="update_title" value="${detail.post.title}">
      <label for="update_body">내용:</label>
      <textarea id="update_body" value="${detail.post.body}">${detail.post.body}</textarea>
      <label for="update_genre">장르:</label>
      <select id="update_genre"></select>
      <div class="updata_btn">
      <button id="confirm_update">확인</button>
      <button id="cancel_update">취소</button>
      </div>
    `;

    detail_update_modal.appendChild(post_modal);

    // 드랍메뉴 update_genre에 넣어주기
    const category_data = await fetchCategory();
    const update_genre_dropdown = document.getElementById('update_genre');
    category_data.category.forEach((genre) => {
      const option = document.createElement('option');
      option.value = genre;
      option.textContent = genre;
      update_genre_dropdown.appendChild(option);
    });

    // 수정 확인 누를 시 업데이트api를 받고 업데이트 해준다.
    const update_confirm_btn = document.getElementById('confirm_update');
    update_confirm_btn.addEventListener('click', async () => {
      const update_title = document.getElementById('update_title').value;
      const update_body = document.getElementById('update_body').value;
      const update_genre = document.getElementById('update_genre').value;

      if (
        update_title === null ||
        update_body === null ||
        update_genre === null
      ) {
        return alert('빈칸을 입력하세요.');
      }

      const updatedPost = {
        title: update_title,
        body: update_body,
        genre: update_genre,
      };

      const response = await fetch(
        `http://localhost:3000/api/auth/post/${postId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedPost),
        },
      );
      const responseData = await response.json();

      alert(responseData.message);
      window.location.reload();
    });

    const update_cancel_btn = document.getElementById('cancel_update');
    update_cancel_btn.addEventListener('click', () => {
      post_modal.innerHTML = '';
    });
  });

  // 게시글 삭제
  // 게시글 삭제 api와 버튼 클릭 시 삭제
  post_delete_btn.addEventListener('click', async () => {
    const postId = detail.post.postId;
    const response = await fetch(
      `http://localhost:3000/api/auth/post/${postId}`,
      {
        method: 'DELETE',
      },
    );
    const responseData = await response.json();
    alert(responseData.message);
    window.location.reload();
  });
};

// post API 가져오기
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

// 카테고리 가져오기
const fetchCategory = async () => {
  const response = await fetch(`http://localhost:3000/api/category`);
  const responseData = await response.json();
  return responseData;
};
