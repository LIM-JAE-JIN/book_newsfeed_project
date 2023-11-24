async function signin() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // 서버로 전송할 데이터 생성
  const userInput = {
    email: email,
    password: password,
  };

  // 서버로 데이터 전송
  fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInput),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.success) {
        alert(`${result.message}`);
        window.location.href = '/page/main_list.html';
      } else {
        alert(`${result.errorMessage}`);
        window.location.href = '/page/index_login.html';
      }
    })
    .catch((error) => {
      console.error('회원가입 실패:', error);
    });
}
