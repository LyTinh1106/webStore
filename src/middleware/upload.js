const multer = require("multer");
const path = require("path");

// ẢNH: Lưu vào ổ cứng
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/public/images/");
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9); 
    // const ext = path.extname(file.originalname);
    // cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    cb(null, file.originalname);
  }
});

// THÔNG SỐ: Lưu trong bộ nhớ RAM
const specStorage = multer.memoryStorage();

// Hàm lọc theo fieldname để chọn đúng storage
const storageSelector = {
  specFile: specStorage,
  images: imageStorage,
  editImages: imageStorage
};

const upload = multer({
  storage: {
    _handleFile(req, file, cb) {
      const selectedStorage = storageSelector[file.fieldname];
      if (!selectedStorage || !selectedStorage._handleFile) {
        return cb(new Error("Invalid storage for field: " + file.fieldname));
      }
      return selectedStorage._handleFile(req, file, cb);
    },
    _removeFile(req, file, cb) {
      const selectedStorage = storageSelector[file.fieldname];
      if (selectedStorage && selectedStorage._removeFile) {
        return selectedStorage._removeFile(req, file, cb);
      }
      cb(null);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 4
  }
});

module.exports = upload;