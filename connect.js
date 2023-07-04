const mongoose = require('mongoose')

const connectDb = async (url) => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Connected to MongoDB')
  } catch (error) {
    console.log('Error: ', error.message)
  }
}

module.exports = connectDb
