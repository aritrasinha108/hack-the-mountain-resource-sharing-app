const crypto = require('crypto');
const path = require('path');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
// const {mongoURI1,mongoURI2}=require('../config');

var storage = new GridFsStorage({
  url: process.env.URI2,

  options: {
    useUnifiedTopology: true
  },
  file: (req, file) => {
    console.log("Inside the single upload");
    console.log(req.body);

    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        console.log("Inside the upload function");
        if (err) {
          {
            console.log(err);


            return reject(err);
          }
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'resource'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });
module.exports = upload;