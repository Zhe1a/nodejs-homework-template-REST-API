const multer = require("multer");
const path = require("path");

const client_max_body_size = "100mb"
const tempDir = path.resolve("../", "temp");

const storage = multer.diskStorage({
  destination: tempDir,
  fileName: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: client_max_body_size },
});

module.exports = upload;
