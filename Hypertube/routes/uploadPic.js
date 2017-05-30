var path    = require('path'),
    fs      = require('fs'),
    multer  = require('multer'),
    crypto  = require('crypto'),
    sharp   = require('sharp');

var storage = multer.diskStorage({
  destination: './public/upload/',
  
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err);
      cb(null, raw.toString('hex') + path.extname(file.originalname));
    });
  }
});

var maxSize = 10 * 1000 * 1000;

var uploadPic = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: function (req, file, cb) {
    var filetypes = /jpeg|jpg|png/;
    var mimetype = filetypes.test(file.mimetype);
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      return cb(null, false);
    }
  }
}
).single('pic');

var upload = function (req, res, next) {
 uploadPic(req, res, function (err) {
  if (err) {
    console.log(err);
    return next();
  }
  sharp('./public/upload/' + req.file.filename)
    .resize(240, 320)
    .toFile('./public/upload/avatar' + req.file.filename, (err, info) => {
      if (err) {
        console.log(err);
      }
      fs.unlink('./public/upload/' + req.file.filename, err => {
        if (err) {
          console.log(err);
        }
        return next();
      });
    });
  });
}

module.exports = {
  upload
}