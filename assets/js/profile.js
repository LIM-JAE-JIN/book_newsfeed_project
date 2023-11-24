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

// 쿠키에서 토큰을 가져오는 함수
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
// 'token' 쿠키에서 저장된 토큰을 가져옴
const token = getCookie('token');
// 토큰이 존재한다면 사용자가 로그인한 상태
if (token) {
  // 서버로 토큰을 포함한 요청을 보내거나, 필요한 작업을 수행할 수 있음
  console.log('사용자가 로그인한 상태입니다. 토큰:', token);
} else {
  alert('로그인해주세요. 3초 뒤 로그인 페이지로 이동합니다.');
  setTimeout(() => {
    window.location.href = "http://localhost:3000/page/index_login.html";
  }, 3000);
}

const profileData = await fetchProfilelData();
const profileCont = document.querySelector("#profileCont");

profileCont.innerHTML = `<p>계정 : <span class="email">${profileData.data.email}</span></p>
          <p>닉네임 : <span class="username">${profileData.data.username}</span></p>
          <p>
            인사말 :
            <span class="introduce">${profileData.data.introduce}</span>
          </p>
          <p>가입날짜 : <span class="created_at">${profileData.data.createdAt.slice(0, 10)}</span></p>`;


async function fetchProfilelData() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        `Bearer ${token}`
    }
  };

  const response = await fetch(`http://localhost:3000/api/mypage`, options);
  const data = await response.json();
  return data;
}