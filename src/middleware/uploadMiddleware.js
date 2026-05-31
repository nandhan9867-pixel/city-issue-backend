const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads");
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9);

    cb(
      null,
      uniqueName +
      path.extname(file.originalname)
    );
  }
});

const fileFilter = (req, file, cb) => {

  const allowedTypes =
  /jpeg|jpg|png/;

  const isValid =
  allowedTypes.test(
    file.mimetype
  );

  if (isValid) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only JPG, JPEG and PNG allowed"
      )
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

module.exports = upload;