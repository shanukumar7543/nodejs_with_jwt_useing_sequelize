require('dotenv').config({ path: './.env' })
const express = require('express')
const cors = require('cors')
const app = new express()
const router = require('./router')
const cookieParser = require('cookie-parser')
const logger = require('./winston/index')

app.use(cors())
app.use(express.json())
app.use(cookieParser('qwertyuiop'))
app.use(express.urlencoded({ extended: true }))

app.use('/api', router)

app.use((error, req, res, next) => {
  console.log('error', error)
  if (error.code === 'EBADCSRFTOKEN') {
    error.statusCode = 403
    error.message = 'Access Denied'
  }
  const status = error.statusCode || 500
  const message = error.message
  const data = error.data
  console.log('massage', message)
  console.log('data', data)
  res.status(status).json({ message: message, data: data })
})

app.get('*', (req, res) => {
  res.status(404).json({ message: 'Invalid URL !!' })
})

const server = app.listen(5000, () => {
  console.log(`Server started successfully`)
})
