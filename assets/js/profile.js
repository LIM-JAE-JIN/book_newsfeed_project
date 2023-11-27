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

// 내 프로필 조회
const profileData = await fetchProfilelData();
const profileCont = document.querySelector('#profileCont');

profileCont.innerHTML = `
  <p>계정 : <span class="email">${profileData.data.email}</span></p>
  <p>닉네임 : <span class="username">${profileData.data.username}</span></p>
  <p>
    인사말 :
    <span class="introduce">${profileData.data.introduce}</span>
  </p>
  <p>가입날짜 : <span class="created_at">${profileData.data.createdAt.slice(
    0,
    10,
  )}</span></p>`;

async function fetchProfilelData() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  const response = await fetch(`http://13.209.15.124/api/mypage`, options);
  const data = await response.json();
  return data;
}

// 내 프로필 수정
$('#editBtn').on('click', async function () {
  const username = document.getElementById('username').value;
  const introduce = document.getElementById('introduce').value;
  const password = document.getElementById('password').value;
  const editInput = {
    password: password,
    username: username,
    introduce: introduce,
  };
  const profileEditData = await updateProfile(editInput);
  profileCont.innerHTML = `<p>계정 : <span class="email">${
    profileEditData.data.email
  }</span></p>
    <p>닉네임 : <span class="username">${
      profileEditData.data.username
    }</span></p>
    <p>
      인사말 :
      <span class="introduce">${profileEditData.data.introduce}</span>
    </p>
    <p>가입날짜 : <span class="created_at">${profileEditData.data.createdAt.slice(
      0,
      10,
    )}</span></p>`;
  document.getElementById('username').value = '';
  document.getElementById('introduce').value = '';
  document.getElementById('password').value = '';
});

async function updateProfile(profileData) {
  try {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    };
    const response = await fetch('http://13.209.15.124/api/mypage', options);
    const data = await response.json();

    if (data.success) {
      console.log('프로필이 성공적으로 수정되었습니다.', data.data);
      alert('프로필이 수정되었습니다.');
      return data;
    } else {
      console.error('프로필 수정 실패:', data.message);
      alert(data.message);
      document.getElementById('password').value = '';
    }
  } catch (error) {
    // 네트워크 오류 또는 기타 예외 상황에 대한 처리
    console.error('프로필 수정 요청 중 오류 발생:', error);
  }
}

// 내글 리스트
const lists = await fetchListeData();
console.log(lists);
const listWrap = document.querySelector('#list_cont');
listWrap.innerHTML = lists
  .map(
    (list) => `
    <li>
      <a href="/page/detail.html?postId=${list.postId}"></a>
      <p class="title">${list.title}</p>
      <p class="content">${list.body}</p>
      <div style="display: flex; justify-content: space-between">
        <p class="genre">장르: ${list.genre}</p>
        <p class="name">작성자 : 나</p>
      </div>
    </li>`,
  )
  .join('');

async function fetchListeData() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  const response = await fetch(
    'http://13.209.15.124/api/auth/mypage/posts',
    options,
  );
  const data = await response.json();
  return data.data;
}
