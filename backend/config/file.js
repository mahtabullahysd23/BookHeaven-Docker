// const multer = require("multer");
// const fileTypes = require("../constants/fileType");
// const path = require("path");

// const upload = multer({
//     limits: {
//         fileSize: 536870912,
//     },
//     storage: multer.diskStorage({
//         destination: (req, file, callback) => {
//             if (file) {
//                 callback(null, "./Server");
//             } else {
//                 req.file.error = "No file was found";
//                 callback("No file was found", null);
//             }
//         },
//         filename: (req, file, callback) => {
//             if (file) {
//                 callback(null, Date.now() + "_" + file.originalname);
//             } else {
//                 callback("No file was found", null);
//             }
//         },
//     }),
//     fileFilter: (req, file, callback) => {
//         if (file) {
//             const extension = path.extname(file.originalname);
//             req.file_extension = extension;
//             if (fileTypes.includes(extension)) {
//                 callback(null, true);
//             } else {
//                 callback(null, false);
//             }
//         } else {
//             callback("No file found", false);
//         }
//     },
// });

// module.exports = upload;

const multer = require("multer");
const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_S3_REGION,
});

const s3 = new AWS.S3();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // limit file size to 5MB
  },
});

module.exports = { upload, s3 };
