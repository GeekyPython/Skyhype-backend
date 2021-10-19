const util = require("util");
const multer = require("multer");
const {database_url} = require('../config');
const {GridFsStorage} = require("multer-gridfs-storage");

var storage = new GridFsStorage({
  url: database_url,
  file: (req,file) => {
    return {
      filename: 'skyHype-profile-image'+ Date.now().toString()
    }
  }
});

const uploadImage = util.promisify(multer({storage, dest: '../temp'}).single("profile_image"));
module.exports = uploadImage;
