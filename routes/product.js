const express = require('express')
const router = express.Router()

// import custom packages
const {getProducts, createProduct, productById, getProductById, deleteProduct, updateProduct, getProductPhoto, findWithCategoryId, productByCatId} = require('../controllers/product')
const {createProductValid} = require('../validator/index')
const {requireSignIn} = require('../controllers/auth')

router.get('/getproducts',requireSignIn, getProducts)
router.get('/product/:productById', getProductById)
router.put('/product/:productById', updateProduct)
router.get('/productsByCategoryid/:catId', findWithCategoryId)
router.get('/product/photo/:productById', getProductPhoto)
router.post('/createproduct', createProduct)
router.delete('/product/:productById', deleteProduct)


router.param('productById', productById) 
router.param('catId', productByCatId)

module.exports = router