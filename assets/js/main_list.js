// posts 카드 함수
const makePost = (posts) => {
  const posts_container = document.getElementById('posts_container');

  posts_container.innerHTML = '';
  posts.forEach((post) => {
    const post_container = document.createElement('div');
    post_container.classList.add('post_container');

    const post_title = document.createElement('button');
    post_title.classList.add('post_title');
    post_title.textContent = post.title;

    const post_body = document.createElement('div');
    post_body.classList.add('post_body');
    post_body.textContent = post.body;

    const post_genre = document.createElement('div');
    post_genre.classList.add('post_genre');
    post_genre.textContent = `장르: ${post.genre}`;

    post_container.append(post_title, post_body, post_genre);
    posts_container.appendChild(post_container);

    post_title.addEventListener('click', async () => {
      await getPost(post.postId);
    });
  });
};

// 상세 게시글 조회
const getPost = async (postId) => {
  const response = await fetch(`http://localhost:3000/api/post/${postId}`);
  const responseData = await response.json();
  const post = responseData;

  const title = post.post.title;
  const body = post.post.body;
  const genre = post.post.genre;

  const posts_container = document.getElementById('posts_container');
  posts_container.innerHTML = '';

  const post_edit_btn = document.createElement('button');
  post_edit_btn.classList.add('post_edit_btn');
  post_edit_btn.innerHTML = '수정';
  post_edit_btn.addEventListener('click', async () => {
    const postId = post.post.postId;
    const response = await fetch(
      `http://localhost:3000/api/auth/post/${postId}`,
      {
        method: 'PUT',
      },
    );
    const responseData = await response.json();
    console.log(responseData);
  });

  const post_delete_btn = document.createElement('button');
  post_delete_btn.classList.add('post_delete_btn');
  post_delete_btn.innerHTML = '삭제';
  // 게시글 삭제 api와 버튼 클릭 시 삭제
  post_delete_btn.addEventListener('click', async () => {
    const postId = post.post.postId;
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
  // 상세 게시글 바탕 모달
  const post_modal = document.createElement('div');
  post_modal.append(title, body, genre, post_delete_btn, post_edit_btn);
  posts_container.append(post_modal);
};

// // 로그인 후 카테고리 별 포스트
// const getUserLoginCategoryPosts = async (category) => {
//   // 백엔드 카테코리 조회 api 가져오기
//   const response = await fetch(
//     `http://localhost:3000/api/auth/posts?category=${category}`,
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

// // 로그인 후 포스트 조회
// const getUserLoginPosts = async () => {
//   // 백엔드 카테코리 조회 api 가져오기
//   const response = await fetch(`http://localhost:3000/api/auth/posts`);
//   const responsetData = await response.json();
//   const posts = responsetData.data;

//   const posts_container = document.getElementById('posts_container');
//   posts_container.innerHTML = '';

//   // post 카드 함수
//   makePost(posts);
// };

// getUserLoginPosts();

// 로그인 후 마이페이지 포스트
const getMypagePosts = async () => {
  // 백엔드 카테코리 조회 api 가져오기
  const response = await fetch(`http://localhost:3000/api/auth/mypage/posts`);
  const responsetData = await response.json();
  const posts = responsetData.data;

  const posts_container = document.getElementById('posts_container');
  posts_container.innerHTML = '';

  // post 카드 함수
  makePost(posts);
};

getMypagePosts();

// // 로그인 후 마이페이지 카테고리 별 포스트
// const getMypageCategoryPosts = async (category) => {
//   // 백엔드 카테코리 조회 api 가져오기
//   const response = await fetch(
//     `http://localhost:3000/api/auth/mypage/posts?:category=${category}`,
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
        await getMypageCategoryPosts(genre);
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
