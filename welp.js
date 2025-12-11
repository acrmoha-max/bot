// One single JS script to fetch cookies from a website and output JSON
// Requires: axios + tough-cookie + axios-cookiejar-support
// Install with: npm install axios tough-cookie axios-cookiejar-support

const axios = require('axios').default;
const { wrapper } = require('axios-cookiejar-support');
const tough = require('tough-cookie');

async function getCookiesAsJSON(url) {
  // Create a cookie jar
  const cookieJar = new tough.CookieJar();

  // Wrap axios to support cookies
  const client = wrapper(axios.create({ jar: cookieJar, withCredentials: true }));

  // Make request
  await client.get(url);

  // Extract cookies from jar
  const cookies = cookieJar.getCookiesSync(url);
  const cookieJSON = {};
  cookies.forEach(c => {
    cookieJSON[c.key] = c.value;
  });

  // Print JSON
  console.log(JSON.stringify(cookieJSON, null, 2));
}

// Example usage
getCookiesAsJSON('https://roblox.com');
