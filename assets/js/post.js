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
  const post_content = document.getElementById('post_content');
  const post_confirm_btn = document.querySelector('.post_confirm');
  const post_cancel_btn = document.querySelector('.post_cancel');
  const post_genre = document.getElementById('post_genre');

  post_modal.append(post_content);
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

  post_create_btnBtn.style.display = 'none';
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
