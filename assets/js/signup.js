async function signup() {
  const email = document.getElementById('email').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // 서버로 전송할 데이터 생성
  const userInfo = {
    username: username,
    email: email,
    password: password,
    confirmPassword: confirmPassword,
  };

  // 서버로 데이터 전송
  fetch('http://localhost:3000/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.success) {
        alert(`${result.message}`);
        window.location.href = '/page/index_login.html';
      } else {
        alert(`${result.errorMessage}`);
        window.location.href = '/page/join.html';
      }
    })
    .catch((error) => {
      alert(`회원가입에 실패하였습니다.`);
      console.error('회원가입 실패:', error);
      window.location.href = '/page/index_login.html';
    });
}
