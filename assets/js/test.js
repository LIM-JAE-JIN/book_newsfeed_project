const testAPI = async () => {
  const apiUrl = '/';
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Content-Type 확인
    const contentType = response.headers.get('Content-Type');

    if (contentType && contentType.includes('application/json')) {
      // JSON이면 파싱
      const data = await response.json();
      console.log('API 응답:', data);
    } else {
      // JSON이 아닌 응답 처리
      const text = await response.text();
      console.log('JSON이 아닌 응답:', text);
    }
  } catch (error) {
    console.error(error.message);
  }
};

testAPI();

