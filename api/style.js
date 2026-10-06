export default async function handler(req, res) {
  // CORS Headers enable kar rahe hain taakay web app se call ho sake
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Content-Type", "application/json");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    // User jo text pass karega woh catch karega (default: Ramzan)
    const { text = "Ramzan" } = req.query;

    // Original API ko call karna
    const targetUrl = `https://style-text-gen.vercel.app/api/style?text=${encodeURIComponent(text)}`;
    const response = await fetch(targetUrl);

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error: "Original API fetching failed"
      });
    }

    const originalData = await response.json();

    // Custom credits & structure modification
    const customResponse = {
      success: originalData.success ?? true,
      developer: "Ramzan Ahsan", // Aapka Developer Name
      version: originalData.version || "1.0.0",
      meta: originalData.meta || {},
      analysis: originalData.analysis || {},
      data: originalData.data || []
    };

    return res.status(200).json(customResponse);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
      details: error.message
    });
  }
}
