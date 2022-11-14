const fs = require("fs");

const tryCatch = require("./utils/tryCatch");
const Product = require("../models/product");
const Category = require("../models/category");

//MULTER UPLOAD
const multer = require("multer");
const imagePath = ".public/uploads/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //NẾU CHƯA CÓ FOLDER THÌ SẼ TẠO 1 FOLDER MỚI
    if (!fs.existsSync(imagePath)) {
      fs.mkdirSync(imagePath, { recursive: true });
      cb(null, PATH);
    } else {
      cb(null, imagePath);
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 },
});

const uploadCategoryImage = tryCatch((req, res, next) => {
  upload.single("file")(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      res.status(500).json(err);
    } else if (err) {
      res.status(500).json(err);
    } else {
      const { id } = req.params;
      const category = await Category.findById(id);
      category.imageUrl = `/uploads/${id}/${req.file.originalname}`;
      await category.save();
      res.status(200).json({ ok: true, body: req.file });
    }
  });
});

const uploadProductImage = tryCatch((req, res, next) => {
  upload.array("files", 10)(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      res.status(500).json(err);
    } else if (err) {
      res.status(500).json(err);
    } else {
      const { id } = req.params;
      const product = await Product.findById(id);
      const imageURL = req.files.map((file) => {
        return `/uploads/${id}/${file.originalname}`;
      })
      product.imageURL.push(...imageURL);
      await product.save();
      res.status(200).json({ ok: true, body: req.files });
    }
  });
});

module.exports = {
  uploadProductImage,
  uploadCategoryImage,
};
