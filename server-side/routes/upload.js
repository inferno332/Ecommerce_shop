const fs = require("fs");
const express = require("express");
const router = express.Router();

//MULTER UPLOAD
const multer = require("multer");
const { updateDocument } = require("../helpers/MongoDbHelper");

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
        fs.mkdirSync(PATH);
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

router.post("/categories/:id", function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      res.status(500).json({ type: "MulterError", err: err });
    } else if (err) {
      res.status(500).json({ type: "UnknownError", err: err });
    } else {
      const categoryId = req.params.id;
      updateDocument(
        categoryId,
        { imageUrl: `/uploads/categories/${categoryId}/${req.file.filename}` },
        "categories"
      );
      console.log(req.body);
      const publicUrl = `${req.protocol}://${req.hostname}:9000/uploads/categories/${categoryId}/${req.file.filename}`;
      res.status(200).json({ ok: true, publicUrl: publicUrl, file: req.file });
    }
  });
});

module.exports = router;
