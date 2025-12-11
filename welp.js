const https = require('https');

function getCookiesAsJSON(url) {
  https.get(url, (res) => {
    // Extract "set-cookie" headers
    const setCookies = res.headers['set-cookie'] || [];

    const cookieObj = {};
    setCookies.forEach(cookieStr => {
      const parts = cookieStr.split(';')[0]; // take only "name=value"
      const [name, value] = parts.split('=');
      if (name && value) {
        cookieObj[name.trim()] = decodeURIComponent(value.trim());
      }
    });

    console.log("Cookies from response:");
    console.log(JSON.stringify(cookieObj, null, 2));

    // If you also want to see the raw body of welp.js:
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log("\nResponse body:");
      console.log(data);
    });
  }).on('error', (err) => {
    console.error('Error fetching URL:', err.message);
  });
}

// Example usage:
getCookiesAsJSON('https://roblox.com');
