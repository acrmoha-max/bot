const axios = require('axios');

async function getCookiesAsJSON(url) {
  try {
    // Send GET request
    const response = await axios.get(url);

    // Axios exposes raw headers
    const setCookies = response.headers['set-cookie'] || [];

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

    // Print raw response body
    console.log("\nResponse body:");
    console.log(response.data);

  } catch (err) {
    console.error("Error fetching URL:", err.message);
  }
}

// Example usage
getCookiesAsJSON("https://roblox.com");
