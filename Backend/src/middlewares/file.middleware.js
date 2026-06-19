const multer = require("multer")

//multer is a middleware for handling multipart/form-data, which is primarily used for uploading files. In this code, multer is configured to use memory storage, which means that the uploaded files will be stored in memory as Buffer objects. The limits option is set to restrict the maximum file size to 3MB, preventing users from uploading excessively large files that could potentially cause performance issues or exhaust server resources. This middleware can be used in routes that handle file uploads, allowing the server to process the uploaded files as needed (e.g., saving them to disk, sending them to another service, etc.).
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 3 * 1024 * 1024 // 3MB
    }
})


module.exports = upload