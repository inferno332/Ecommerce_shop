const fs = require("fs");

const tryCatch = require("./utils/tryCatch");
const Product = require("../models/product");
const { updateDocument } = require("../helpers/MongoDbHelper");

//MULTER UPLOAD
const multer = require("multer");
const imagePath = ".public/uploads/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //NẾU CHƯA CÓ FOLDER THÌ SẼ TẠO 1 FOLDER MỚI
    if (!fs.existsSync(imagePath)) {
      fs.mkdirSync(imagePath, { recursive: true });
      cb(null, PATH);
    } else if (file.fieldname === "file") {
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

function uploadImage(req, res, next) {
  upload.any()(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      res.status(500).json(err);
    } else if (err) {
      res.status(500).json(err);
    } else {
      if (req.params.id) {
        const { id } = req.params;
        let data = {
          imageUrl: `/uploads/${id}/${req.files[0].filename}`,
        };
        res.status(200).json(data);
      } else {
        let data = {
          imageUrl: `/uploads/${req.files[0].filename}`,
        };
        res.status(200).json(data);
      }
    }
  });
}

// //CHỈ ĐỊNH THƯ MỰC MÀ ẢNH UPLOAD VÀO
// const UPLOAD_DIRECTORY = "./public/uploads/";

// //CẤU HÌNH THƯ MỤC UPLOAD
// const uploadMultiple = multer({
//   storage: multer.diskStorage({
//     contentType: multer.AUTO_CONTENT_TYPE,
//     destination: function (req, file, callback) {
//       const { id } = req.params;
//       const PATH = UPLOAD_DIRECTORY + "/" + id;

//       //NẾU CHƯA CÓ FOLDER THÌ SẼ TẠO 1 FOLDER MỚI
//       if (!fs.existsSync(PATH)) {
//         fs.mkdirSync(PATH, { recursive: true });
//         callback(null, PATH);
//       } else {
//         callback(null, PATH);
//       }
//     },
//     filename: function (req, file, callback) {
//       callback(null, file.originalname);
//     },
//   }),
// }).array("files", 12);

// const uploadSingle = multer({
//   storage: multer.diskStorage({
//     contentType: multer.AUTO_CONTENT_TYPE,
//     destination: function (req, file, callback) {
//       const { id } = req.params;
//       const PATH = UPLOAD_DIRECTORY + "/" + id;

//       //NẾU CHƯA CÓ FOLDER THÌ SẼ TẠO 1 FOLDER MỚI
//       if (!fs.existsSync(PATH)) {
//         fs.mkdirSync(PATH, { recursive: true });
//         callback(null, PATH);
//       } else {
//         callback(null, PATH);
//       }
//     },
//     filename: function (req, file, callback) {
//       callback(null, file.originalname);
//     },
//   }),
// }).any();

// const uploadMultipleImage = tryCatch((req, res) => {
//   uploadMultiple(req, res, async (err) => {
//     if (err instanceof multer.MulterError) {
//       res.status(500).json(err);
//     } else if (err) {
//       res.status(500).json(err);
//     } else {
//       const { id } = req.params;
//       const product = await Product.findById(id);
//       const files = req.files;
//       const imageURL = files.map((file) => {
//         return file.path.replace("public", "");
//       });
//       product.imageURL.push(...imageURL);
//       await product.save();
//       res.status(200).json(product);
//     }
//   });
// });

// const uploadSingleImage = tryCatch((req, res) => {
//   uploadSingle(req, res, async (err) => {
//     if (err instanceof multer.MulterError) {
//       res.status(500).json(err);
//     } else if (err) {
//       res.status(500).jsom(err);
//     } else {
//       const { id } = req.params;
//       updateDocument(
//         id,
//         { imageUrl: `/uploads/${id}/${req.files[0].filename}` },
//         "categories"
//       );
//       res.status(200).json({ ok: true, body: req.files });
//     }
//   });
// });

module.exports = { 
  // uploadMultipleImage, 
  // uploadSingleImage, 
  uploadImage };
