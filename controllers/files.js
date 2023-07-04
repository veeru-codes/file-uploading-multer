const express = require('express')
const multer = require('multer')
const File = require('../models/fileSchema.js')

const fileRouter = express.Router()

//Configuration for Multer
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public')
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1]
    cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`)
  },
})

// Multer Filter
const multerFilter = (req, file, cb) => {
  if (file.mimetype.split('/')[1] === 'pdf') {
    cb(null, true)
  } else {
    cb(new Error('Not a PDF File!!'), false)
  }
}

// Calling the 'multer' function
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
})

// API Endpoint for uploading file
// The argument for upload.single() must match with the name attribute of input element
fileRouter.post('/uploadFile', upload.single('myFile'), async (req, res) => {
  // Stuff to be added later
  // console.log(req.file)

  try {
    const newFile = new File({
      name: req.file.filename,
    })
    await newFile.save()
    res.status(200).json({
      status: 'Success',
      message: 'File created successfully',
    })
  } catch (error) {
    res.json({ error: error.message })
  }
})

// Get all files
fileRouter.get('/getFiles', async (req, res) => {
  try {
    const files = await File.find({})
    res.status(200).json({
      status: 'Success',
      files,
    })
  } catch (error) {
    res.json({
      status: 'Fail',
      error: error.message,
    })
  }
})

module.exports = fileRouter
