//cludinary upload
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
// Configuration
cloudinary.config({
  cloud_name: "",
  api_key: "",
  api_secret: "",
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "sapu",
    allowedFormats: ["jpeg", "png", "jpg"],
  },
});

const uploadFile = async (req, res) => {
  const upload = multer({ storage: storage }).single("image");
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
};

module.exports = {
  uploadFile,
};
