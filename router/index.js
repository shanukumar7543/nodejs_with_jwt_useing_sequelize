const express = require('express')
const router = express.Router()
const api = require('../controller')
const isAuth = require('../controller/is_auth')

// *** User Login & Registration  ***
router.post('/login', api.login)
router.post('/register', api.register)

// *** Add Product for Shopping List ***
router.post('/product/add', isAuth, api.addProduct)

// *** Get list of All Product ***
router.get('/product/getAll', isAuth, api.getProductList)

// *** Update product price photo and description **
router.put('/product/update/:id', isAuth, api.updateProduct)

// *** Delete Product
router.delete('/product/delete/:id', isAuth, api.deleteProduct)

module.exports = router
