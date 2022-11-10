const fs = require("fs");

const tryCatch = require("./utils/tryCatch");
const Product = require("../models/product");
const { updateDocument } = require("../helpers/MongoDbHelper");

//MULTER UPLOAD
const multer = require("multer");

//CHỈ ĐỊNH THƯ MỰC MÀ ẢNH UPLOAD VÀO
const UPLOAD_DIRECTORY = "./public/uploads/";

//CẤU HÌNH THƯ MỤC UPLOAD
const uploadMultiple = multer({
  storage: multer.diskStorage({
    contentType: multer.AUTO_CONTENT_TYPE,
    destination: function (req, file, callback) {
      const { id } = req.params;
      const PATH = UPLOAD_DIRECTORY + "/" + id;

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

const uploadSingle = multer({
  storage: multer.diskStorage({
    contentType: multer.AUTO_CONTENT_TYPE,
    destination: function (req, file, callback) {
      const { id } = req.params;
      const PATH = UPLOAD_DIRECTORY + "/" + id;

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
}).single("file");

const uploadMultipleImage = tryCatch((req, res) => {
  uploadMultiple(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      res.status(500).json(err);
    } else if (err) {
      res.status(500).json(err);
    } else {
      const { id } = req.params;
      const product = await Product.findById(id);
      const files = req.files;
      const imageURL = files.map((file) => {
        return file.path.replace("public", "");
      });
      product.imageURL.push(...imageURL);
      await product.save();
      res.status(200).json(product);
    }
  });
});

const uploadSingleImage = tryCatch((req, res) => {
  uploadSingle(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      res.status(500).json(err);
    } else if (err) {
      res.status(500).jsom(err);
    } else {
      const { id } = req.params;
      updateDocument(
        id,
        { imageUrl: `/uploads/${id}/${req.file.filename}` },
        "categories"
      );
      res.status(200).json({ ok: true });
    }
  });
});

module.exports = { uploadMultipleImage, uploadSingleImage };
