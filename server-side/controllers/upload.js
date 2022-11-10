const fs = require("fs");

const tryCatch = require("./utils/tryCatch");
const Category = require("../models/category");

//MULTER UPLOAD
const multer = require("multer");

//CHỈ ĐỊNH THƯ MỰC MÀ ẢNH UPLOAD VÀO
const UPLOAD_DIRECTORY = "./public/uploads/categories";

//CẤU HÌNH THƯ MỤC UPLOAD
const upload = multer({
  storage: multer.diskStorage({
    contentType: multer.AUTO_CONTENT_TYPE,
    destination: function (req, file, callback) {
      const categoryId = req.params.id;
      const PATH = UPLOAD_DIRECTORY + "/" + categoryId;

      //NẾU CHƯA CÓ FOLDER THÌ SẼ TẠO 1 FOLDER MỚI
      if (!fs.existsSync(PATH)) {
        fs.mkdirSync(PATH, { recursive: true });
        callback(null, PATH);
      } else {
        callback(null, PATH);
      }
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname);
    },
  }),
}).array("files", 12);

const uploadCategoryImage = tryCatch((req, res) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
          res.status(500).json(err);
        } else if (err) {
          res.status(500).json(err);
        } else {
          const { id } = req.params;
          const category = await Category.findById(id);
          const files = req.files;
          const imageURL = files.map((file) => {
            return file.path.replace("public", "");
          });
          category.imageURL.push(...imageURL);
          await category.save();
          res.status(200).json(category);
        }
      })
});

module.exports = { uploadCategoryImage };
