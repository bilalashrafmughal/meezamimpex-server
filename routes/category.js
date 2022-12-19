const router = require('express').Router()
const {getCategories,createcategory, getCategoryPhoto, catById, deletecategory,getCategory, updateCategory } = require('../controllers/category')
const {createCategoryValid} = require('../validator')
const {requireSignIn} = require('../controllers/auth')

// get all categories
// router.get("/", (req, res)=> res.send('server is running...!'))
router.get("/getcategories", requireSignIn, getCategories)
router.get("/category/:catId", getCategory)
router.put("/category/:catId", updateCategory)
router.post("/createcategory", createcategory)
router.delete("/deletecategory/:catId", deletecategory)
router.get("/category/photo/:catId", getCategoryPhoto)

router.param("catId", catById)


module.exports = router;