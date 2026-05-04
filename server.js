const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();

const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});