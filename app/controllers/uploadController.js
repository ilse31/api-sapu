//cludinary upload
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
// Configuration
cloudinary.config({
  cloud_name: "dvrbyh3ah",
  api_key: "719942156261124",
  api_secret: "iOaH5S89LK0_FG1chAVOv2b_KiE",
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
