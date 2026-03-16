const fetch = require('node-fetch');

async function testApi() {
  try {
    const response = await fetch('http://localhost:3000/api/universities');
    const data = await response.json();
    console.log('Success:', data.success);
    console.log('Count:', data.universities ? data.universities.length : 0);
    if (data.universities) {
      data.universities.forEach(u => console.log('- ' + u.name));
    }
  } catch (err) {
    console.error('API Test Error:', err.message);
  }
}

testApi();
