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

  const genre = await fetchCategory();

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
      const post_genre = document.querySelectorAll('.genre');

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

      const newPost = {
        title: post_title,
        body: post_body,
        genre: selectedGenres[0],
      };

      const response = await fetch('http://localhost:3000/api/auth/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      const responseData = await response.json();
      console.log(responseData);

      post_modal.style.display = 'none';
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  });
});
