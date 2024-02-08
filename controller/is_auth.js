require('dotenv').config({ path: './.env' })
const jwt = require('jsonwebtoken')

// ** cookie authorization for user's token **
module.exports = (req, res, next) => {
  let token = req.signedCookies.token
  if (!token) {
    token = req.get('Authorization')
    if (!token) {
      const error = new Error('Un authorised Access, please login')
      error.statusCode = 401
      throw error
    }
    token = token.split('')[1]
  }
  let decodeToken
  try {
    decodeToken = jwt.verify(token, 'qwertyuiop')
  } catch (err) {
    const error = new Error('Your login expired, please login again')
    error.statusCode = 500
    throw error
  }
  if (!decodeToken) {
    const error = new Error('Your login expired, please login again')
    error.statusCode = 500
    throw error
  } else {
    req.id = decodeToken.id
    req.name = decodeToken.name
    next()
  }
}
