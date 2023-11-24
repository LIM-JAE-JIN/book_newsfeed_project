async function signout() {
  fetch('http://localhost:3000/api/auth/logout', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.success) {
        alert(`${result.message}`);
        window.location.href = '/page/index_login.html';
      } else {
        alert(`${result.errorMessage}`);
        window.location.href = '/page/index_login.html';
      }
    })
    .catch((error) => {
      alert(`로그아웃에 실패하였습니다.`);
      console.error('로그아웃 실패:', error);
      window.location.href = '/page/index_login.html';
    });
}
