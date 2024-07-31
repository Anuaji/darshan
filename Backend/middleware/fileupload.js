const multer = require('multer');
const fileExtension = require('multer');

module.exports.uploadImage = () => {
  //Image settings

  const imageStorage = multer.diskStorage({
    // Setting directory on disk to save uploaded files
    destination : (req, file, cb) => {
       cb(null,'/public/advertisementImages');
    },
    // Setting name of file saved
    filename : (req, file, cb)=>{
       cb(null, file.fieldname + '-' + Date.now() + '.' + fileExtension(file.originalname))
    }
  })
}
