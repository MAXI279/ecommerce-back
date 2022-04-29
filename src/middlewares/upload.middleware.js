const multer = require('multer')
const { v4: uuidv4 } = require('uuid')

const maxSize = 2 * 1024 * 1024

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/public/uploads')
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop()
    const fotoId = `${uuidv4()}.${ext}`
    req.body.fotoId = fotoId
    cb(null, fotoId)
  }
})

const uploadFileMiddleware = multer({
  storage: storage,
  limits: { fileSize: maxSize }
}).single('file')

module.exports = uploadFileMiddleware
