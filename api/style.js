const express = require('express');
const axios = require('axios');
const app = express();

// Enable CORS for all requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Primary Endpoint: /api/style
app.get('/api/style', async (req, res) => {
  try {
    const text = req.query.text || 'Ramzan';
    const targetUrl = `https://style-text-gen.vercel.app/api/style?text=${encodeURIComponent(text)}`;

    // Fetch data from upstream API
    const response = await axios.get(targetUrl, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });

    const data = response.data || {};

    // Construct response with custom developer info and group link
    const customResponse = {
      success: data.success ?? true,
      developer: "Ramzan Ahsan",
      join_group: "https://chat.whatsapp.com/FiZBn0BykHX47d1iHLOay1",
      version: data.version || "6.0.0",
      meta: data.meta || {},
      analysis: data.analysis || {},
      data: data.data || []
    };

    return res.status(200).json(customResponse);

  } catch (error) {
    console.error('API Error:', error.message);

    return res.status(500).json({
      success: false,
      developer: "Ramzan Ahsan",
      join_group: "https://chat.whatsapp.com/FiZBn0BykHX47d1iHLOay1",
      message: "Upstream style API failed to respond.",
      error: error.message
    });
  }
});

// Root route check
app.get('/', (req, res) => {
  res.status(200).json({
    status: "Active",
    message: "Style Text API is running!",
    endpoint: "/api/style?text=YourText"
  });
});

// Export default app for Vercel Serverless Function engine
module.exports = app;
