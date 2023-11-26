window.signout = signout;
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
      console.error('회원가입 실패:', error);
    });
}
