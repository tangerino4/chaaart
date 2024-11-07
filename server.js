const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

// Enable CORS for all routes
app.use(cors());

// Proxy route to handle requests
app.get('/cors-proxy', (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).send('URL parameter is required');
  }

  request(
    { url: targetUrl, headers: { 'User-Agent': 'Mozilla/5.0' } },
    (error, response, body) => {
      if (error) {
        res.status(500).send('Error occurred while fetching the URL');
      } else {
        res.send(body);
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`CORS Proxy server running on port ${PORT}`);
});
