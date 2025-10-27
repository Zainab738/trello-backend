const upload = require("../../config/multercloudinary");

const fileValidation = (req, res, next) => {
  upload.single("profilePic")(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        message: "Invalid file upload",
        error: err.message,
      });
    }
    next();
  });
};

module.exports = fileValidation;
