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
  // 재진님 posts 카드
  listWrap.innerHTML = posts
    .map(
      (post) => `
    <li>
      <a href="/page/detail.html?postId=${post.postId}"></a>
      <p class="title">${post.title}</p>
      <p class="content">${post.body}</p>
      <div style="display: flex; justify-content: space-between">
        <p class="genre">장르: ${post.genre}</p>
        <p class="name">작성자 : ${post.userId}</p>
      </div>
    </li>`,
    )
    .join('');
};

// 로그인 후 카테고리 별 포스트
const getUserLoginCategoryPosts = async (category) => {
  // 백엔드 카테코리 조회 api 가져오기
  const response = await fetch(
    `http://13.209.15.124/api/auth/posts?category=${category}`,
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
  const response = await fetch(`http://13.209.15.124/api/auth/posts`);
  const responsetData = await response.json();
  const posts = responsetData.data;

  // post 카드 함수
  makePost(posts);
};

getUserLoginPosts();

// 카테고리 가져오기
const fetchCategory = async () => {
  const response = await fetch(`http://13.209.15.124/api/category`);
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
