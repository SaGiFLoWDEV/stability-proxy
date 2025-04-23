const express = require("express");
const multer = require("multer");
const axios = require("axios");

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.post("/generate", upload.single("image"), async (req, res) => {
  const prompt = req.body.prompt;
  const imageBuffer = req.file.buffer;
  const imageBase64 = imageBuffer.toString("base64");

  const payload = {
    prompt: prompt,
    init_image: imageBase64,
    mode: "image-to-image"
  };

  try {
    const response = await axios.post(
      "https://api.stability.ai/v2beta/stable-image/generate/core",
      payload,
      {
        headers: {
          "Authorization": "Bearer ",
          "Content-Type": "application/json"
        }
      }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
