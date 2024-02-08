const model = require('../models')
const { Op } = require('sequelize')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// *** User Registration
exports.register = async (req, res, next) => {
  try {
    const password = req.body.password
    const hashedPass = await bcrypt.hash(password, 12)
    const checkUser = await model.user.findOne({
      where: { email: req.body.email },
    })
    if (checkUser) {
      return res.status(400).json({ message: 'User already exists!' })
    }

    const user = await model.user.create({
      name: req.body.name,
      email: req.body.email,
      mob_no: req.body.mob_no,
      password: hashedPass,
    })
    return res.status(200).json({ message: 'User Registered Successfully' })
  } catch (err) {
    if (!err.statusCode) {
      err.message = 'Technical issue, Please try again !!'
      err.statusCode = 500
    }
    next(err)
  }
}

// *** User Login
exports.login = async (req, res, next) => {
  try {
    const email = req.body.email
    const password = req.body.password
    let loadedUser = await model.user.findOne({ where: { email: email } })
    if (!loadedUser) {
      return res.status(401).json({ message: "Email doesn't exist!" })
    }
    const validPassword = await bcrypt.compare(password, loadedUser.password)
    if (!validPassword) {
      return res.status(401).json({ auth: false, message: 'Invalid Password!' })
    }
    const token = jwt.sign(
      { id: loadedUser.id, name: loadedUser.name },
      'qwertyuiop',
    )
    res.cookie('token', token, { httpOnly: true, signed: true })
    return res.status(200).json({
      message: 'login success',
      token: token,
      name: loadedUser.name,
      email: loadedUser.email,
    })
  } catch (err) {
    if (!err.statusCode) {
      err.message = 'Technical issue, Please try again !!'
      err.statusCode = 500
    }
    next(err)
  }
}

// ** Add new product **
exports.addProduct = async (req, res, next) => {
  try {
    const employee = await model.product.create({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      inventory: req.body.inventory,
    })
    res.status(200).json({ message: 'Product added success' })
  } catch (err) {
    if (!err.statusCode) {
      err.message = 'Technical issue, Please try again !!'
      err.statusCode = 500
    }
    next(err)
  }
}
//  ** Update Product **
exports.updateProduct = async (req, res, next) => {
  try {
    const employee = await model.product.update(
      {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        inventory: req.body.inventory,
      },
      { where: { id: req.params.id } },
    )
    res.status(200).json({ message: 'Product update success' })
  } catch (err) {
    if (!err.statusCode) {
      err.message = 'Technical issue, Please try again !!'
      err.statusCode = 500
    }
    next(err)
  }
}
//  ** Get Product List
exports.getProductList = async (req, res, next) => {
  try {
    let limit = req.query.limit ? parseInt(req.query.limit) : 10
    let offset = req.query.offset ? parseInt(req.query.offset) : 0
    let orderBy = req.query.orderBy
      ? [[req.query.orderBy, 'DESC']]
      : [['createdAt', 'DESC']]
    const product = await model.product.findAll({
      limit,
      offset,
      order: orderBy,
    })
    res.status(200).json(product)
  } catch (err) {
    if (!err.statusCode) {
      err.message = 'Technical issue, Please try again !!'
      err.statusCode = 500
    }
    next(err)
  }
}
// ** Remove Product
exports.deleteProduct = async (req, res, next) => {
  try {
    await model.product.destroy({ where: { id: req.params.id } })
    res.status(200).json({ message: 'Product Deleted Successfully' })
  } catch (err) {
    if (!err.statusCode) {
      err.message = 'Technical issue, Please try again !!'
      err.statusCode = 500
    }
    next(err)
  }
}
