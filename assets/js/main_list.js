window.drPopupOpen = drPopupOpen;
window.drPopupClose = drPopupClose;

//팝업 열기
function drPopupOpen(popName) {
  $('body').css('overflow', 'hidden');
  $('.dr-dim').css('display', 'block');
  $(popName).css('display', 'block');
}

//팝업 닫기
function drPopupClose(im) {
  $('body').css('overflow', 'auto');
  $(im).closest('.dr-popup-wrap').css('display', 'none');
  $('.dr-dim').css('display', 'none');
}

// posts 카드 함수
const makePost = (posts) => {
  const listWrap = document.getElementById('list_cont');

  listWrap.innerHTML = posts
    .map(
      (post) => `
    <li>
      <a href="/page/detail.html?postId=${post.postId}"></a>
      <p class="title">${post.title}</p>
      <p class="content">${post.body}</p>
      <div style="display: flex; justify-content: space-between">
        <p class="genre">장르: ${post.genre}</p>
        <p class="name">작성자 : 나</p>
      </div>
    </li>`,
    )
    .join('');
};

// 상세 게시글 조회
// const getPost = async (postId) => {
//   const response = await fetch(`http://localhost:3000/api/post/${postId}`);
//   const responseData = await response.json();
//   const post = responseData;

//   // const post_create_btn = document.getElementById('post_create_btn');

//   // const title = post.post.title;
//   // const body = post.post.body;

//   // const posts_container = document.getElementById('posts_container');
//   // posts_container.innerHTML = '';

//   // // 게시글 수정
//   // const post_edit_btn = document.createElement('button');
//   // post_edit_btn.classList.add('post_edit_btn');
//   // post_edit_btn.innerHTML = '수정';
//   // 게시글 수정 버튼 클릭 시 함수 실행
//   post_edit_btn.addEventListener('click', async () => {
//     const postId = post.post.postId;

//     // 업데이트 포스트 모달
//     post_modal.innerHTML = `
//       <label for="update_title">제목:</label>
//       <input type="text" id="update_title" value="${title}">
//       <br>
//       <label for="update_body">내용:</label>
//       <textarea id="update_body" value="${body}"></textarea>
//       <br>
//       <label for="update_genre">장르:</label>
//       <select id="update_genre"></select>
//       <br>
//       <button id="confirm_update">확인</button>
//       <button id="cancel_update">취소</button>
//     `;

//     posts_container.appendChild(post_modal);

//     // 드랍메뉴 update_genre에 넣어주기
//     const category_data = await fetchCategory();
//     const update_genre_dropdown = document.getElementById('update_genre');
//     category_data.category.forEach((genre) => {
//       const option = document.createElement('option');
//       option.value = genre;
//       option.textContent = genre;
//       update_genre_dropdown.appendChild(option);
//     });

//     // 수정 확인 누를 시 업데이트api를 받고 업데이트 해준다.
//     const update_confirm_btn = document.getElementById('confirm_update');
//     update_confirm_btn.addEventListener('click', async () => {
//       const update_title = document.getElementById('update_title').value;
//       const update_body = document.getElementById('update_body').value;
//       const update_genre = document.getElementById('update_genre').value;

//       if (
//         update_title === null ||
//         update_body === null ||
//         update_genre === null
//       ) {
//         return alert('빈칸을 입력하세요.');
//       }

//       const updatedPost = {
//         title: update_title,
//         body: update_body,
//         genre: update_genre,
//       };

//       const response = await fetch(
//         `http://localhost:3000/api/auth/post/${postId}`,
//         {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(updatedPost),
//         },
//       );
//       const responseData = await response.json();
//       alert(responseData.message);
//       window.location.reload();
//     });

//     const update_cancel_btn = document.getElementById('cancel_update');
//     update_cancel_btn.addEventListener('click', () => {
//       post_modal.innerHTML = '';
//     });
//   });

//   // 게시글 삭제
//   const post_delete_btn = document.createElement('button');
//   post_delete_btn.classList.add('post_delete_btn');
//   post_delete_btn.innerHTML = '삭제';
//   // 게시글 삭제 api와 버튼 클릭 시 삭제
//   post_delete_btn.addEventListener('click', async () => {
//     const postId = post.post.postId;
//     const response = await fetch(
//       `http://localhost:3000/api/auth/post/${postId}`,
//       {
//         method: 'DELETE',
//       },
//     );
//     const responseData = await response.json();
//     alert(responseData.message);
//     window.location.reload();
//   });

//   console.log(post_content);
//   // 상세 게시글 바탕 모달
//   const post_modal = document.createElement('div');
//   post_modal.classList.add('post_modal');
//   const post_updateAndDelete_btn = document.getElementById(
//     'post_updateAndDelete_btn',
//   );
//   post_updateAndDelete_btn.append(post_edit_btn, post_delete_btn);
//   post_modal.append(post_content, post_updateAndDelete_btn);
//   posts_container.append(post_modal);
//   post_create_btn.style.display = 'none';
// };

// 로그인 후 카테고리 별 포스트
const getUserLoginCategoryPosts = async (category) => {
  // 백엔드 카테코리 조회 api 가져오기
  const response = await fetch(
    `http://localhost:3000/api/auth/posts?category=${category}`,
  );
  const responsetData = await response.json();
  const posts = responsetData.data;

  const listWrap = document.getElementById('list_cont');

  // posts가 빈 배열이면 밑에 메시지 반환
  if (posts === undefined) {
    return (listWrap.innerHTML = `
    <li>
    <div>해당 ${category}에 대한 게시물이 없습니다.</div>
    </li>`);
  }

  // post 카드 함수
  makePost(posts);
};

// 로그인 후 포스트 조회
const getUserLoginPosts = async () => {
  // 백엔드 카테코리 조회 api 가져오기
  const response = await fetch(`http://localhost:3000/api/auth/posts`);
  const responsetData = await response.json();
  const posts = responsetData.data;

  // post 카드 함수
  makePost(posts);
};

getUserLoginPosts();

// 로그인 후 마이페이지 포스트
// const getMypagePosts = async () => {
//   // 백엔드 카테코리 조회 api 가져오기
//   const response = await fetch(`http://localhost:3000/api/auth/mypage/posts`);
//   const responsetData = await response.json();
//   const posts = responsetData.data;

//   const posts_container = document.getElementById('posts_container');
//   posts_container.innerHTML = '';

//   // post 카드 함수
//   makePost(posts);
// };

// getMypagePosts();

// // 로그인 후 마이페이지 카테고리 별 포스트
// const getMypageCategoryPosts = async (category) => {
//   // 백엔드 카테코리 조회 api 가져오기
//   const response = await fetch(
//     `http://localhost:3000/api/auth/mypage/posts?category=${category}`,
//   );
//   const responsetData = await response.json();
//   const posts = responsetData.data;

//   const posts_container = document.getElementById('posts_container');
//   posts_container.innerHTML = '';

//   // posts가 빈 배열이면 밑에 메시지 반환
//   if (posts === undefined) {
//     return (posts_container.innerHTML = `해당 ${category}에 대한 게시글이 존재하지 않습니다.`);
//   }

//   // post 카드 함수
//   makePost(posts);
// };

// 카테고리 가져오기
const fetchCategory = async () => {
  const response = await fetch(`http://localhost:3000/api/category`);
  const responseData = await response.json();
  return responseData;
};

// 카테고리 클릭 드랍메뉴
const categoryDropmenu = async () => {
  // 카테고리 별로 조회 가능하게 하기 위해 드랍메뉴로 만들었다.
  const genre_dropmenu_btn = document.getElementById('genre_menu_btn');
  const category_container = document.createElement('div');
  category_container.classList.add('category_container');

  // 드랍메뉴 클릭 시 장르를 보여주는 기능
  genre_dropmenu_btn.addEventListener('click', async () => {
    const category_data = await fetchCategory();
    const category_dropmenu = document.createElement('div');
    category_dropmenu.classList.add('category_dropmenu');

    // category를 하나씩 돌아주며 보여준다.
    category_data.category.forEach((genre) => {
      const dropmenu_container = document.getElementById('dropmenu_container');
      const category_content = document.createElement('button');
      category_content.classList.add('category_content');

      category_content.textContent = genre;

      category_dropmenu.appendChild(category_content);
      dropmenu_container.appendChild(category_container);

      // category를 클릭 시 해당 게시글을 보여준다.
      category_content.addEventListener('click', async () => {
        await getUserLoginCategoryPosts(genre);
        category_container.style.display = 'none';
      });
    });

    if (category_container.style.display === 'block') {
      category_container.style.display = 'none';
    } else {
      category_container.innerHTML = '';
      category_container.appendChild(category_dropmenu);
      category_container.style.display = 'block';
    }
  });
};

categoryDropmenu();
