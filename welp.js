const https = require('https');

function getCookiesAsJSON(url) {
  https.get(url, (res) => {
    // Extract "set-cookie" headers
    const setCookies = res.headers['set-cookie'] || [];

    const cookieObj = {};
    setCookies.forEach(cookieStr => {
      // Each cookie string looks like: "name=value; Path=/; HttpOnly"
      const parts = cookieStr.split(';')[0]; // take only "name=value"
      const [name, value] = parts.split('=');
      if (name && value) {
        cookieObj[name.trim()] = decodeURIComponent(value.trim());
      }
    });

    console.log(JSON.stringify(cookieObj, null, 2));
  }).on('error', (err) => {
    console.error('Error fetching URL:', err.message);
  });
}

// Example usage:
getCookiesAsJSON('https://roblox.com');
