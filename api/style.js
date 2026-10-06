const express = require('express');
const app = express();

// CORS Headers enable karne ke liye
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/api/style', async (req, res) => {
  try {
    const text = req.query.text || 'Ramzan';
    
    // Original API se response fetch karna
    const targetUrl = `https://style-text-gen.vercel.app/api/style?text=${encodeURIComponent(text)}`;
    const response = await fetch(targetUrl);
    
    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error: 'Failed to fetch data from original source'
      });
    }

    const data = await response.json();

    // Re-ordering Keys with Custom Fields
    const customResponse = {
      success: data.success,
      developer: "Ramzan Ahsan",
      join_group: "https://chat.whatsapp.com/FiZBn0BykHX47d1iHLOay1",
      version: data.version,
      meta: data.meta,
      analysis: data.analysis,
      data: data.data
    };

    return res.status(200).json(customResponse);

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

app.get('/', (req, res) => {
  res.send('Style Text API Proxy is Running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
