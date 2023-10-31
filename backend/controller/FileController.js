const path = require("path");
const fileTypes = require("../constants/fileType");
const HTTP_STATUS = require("../constants/statusCodes");
const response = require("../utility/common");
const fs = require("fs");
const { s3 } = require("../config/file");

class FileController {
  // async uploadFile(req, res, next) {
  //     try {
  //         if (!fileTypes.includes(req.file_extension)) {
  //             return response(res, HTTP_STATUS.BAD_REQUEST, "Only .jpg, .png, .jpeg, .txt, .pdf");
  //         }

  //         if (!req.file) {
  //             return response(res, HTTP_STATUS.NOT_FOUND, "Failed to upload file");
  //         }

  //         return response(res, HTTP_STATUS.OK, "Successfully uploaded file", req.file);
  //     } catch (error) {
  //         console.log(error);
  //         return response(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Internal server error");
  //     }
  // }

  async uploadFile(req, res, next) {
    try {
      const file = req.file;
      if (!file) {
        return response(res, HTTP_STATUS.NOT_FOUND, "File not found");
      }
      const fileExtension = file.originalname.split(".").pop();
      if (!fileTypes.includes(fileExtension)) {
        return response(
          res,
          HTTP_STATUS.BAD_REQUEST,
          "Only .jpg, .png, .jpeg supported"
        );
      }
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: "images/" + Date.now() + "_" + file.originalname,
        Body: file.buffer,
      };
      const data = await s3.upload(params).promise();
      return response(res, HTTP_STATUS.OK, "Successfully uploaded file", data);
    } catch (error) {
      return response(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal server error"
      );
    }
  }

  async getFile(req, res, next) {
    try {
      const { filepath } = req.params;
      const exists = fs.existsSync(
        path.join(__dirname, "..", "Server", filepath)
      );
      if (!exists) {
        return response(res, HTTP_STATUS.NOT_FOUND, "File not found");
      }
      return res
        .status(200)
        .sendFile(path.join(__dirname, "..", "Server", filepath));
    } catch (error) {
      console.log(error);
      return response(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal server error"
      );
    }
  }
}

module.exports = new FileController();
