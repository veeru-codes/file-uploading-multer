require('dotenv').config()
const path = require('path')
const cors = require('cors')
const express = require('express')
const connectDb = require('./connect.js')
const fileRouter = require('./controllers/files.js')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.urlencoded({ extended: false }))

// Configuration for static files
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(`${__dirname}/public`))

// This should be the last
app.get('/', (req, res) => {
  res.status(200).render('index')
})

// Routes
app.use('/api/files', fileRouter)

const start = async () => {
  try {
    await connectDb(process.env.MONGODB_URI)
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.log('Error: ', error.message)
  }
}

start()
