const {check, validationResult} = require('express-validator')



exports.createAdminValid =[
    check('firstName', 'First name is required, please enter').notEmpty(),
    check('firstName', 'First name should be within 3 to 20 charector').isLength({min: 3, max: 20}),
    check('lastName', 'Last name should be within 3 to 20 charector').isLength({min: 3, max: 20}),
    check('lastName', 'Last name is required, please enter').notEmpty().withMessage('last name can not be empty'),
    check('email','Email is not valid').notEmpty().normalizeEmail().isEmail(),
    check('password', 'password is not valid, it must be within 8 to 20 charector long').isLength({min: 8, max:30}),

    (req, res, next)=>{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(422).json({error: errors.array()[0].msg})
        }

        next();
        
    }
]

// CREATE PRODUCT

exports.createProductValid = [
    // first name
    check('productName', 'Product Name is Required').notEmpty(),
    check('productName', 'Product Name must be within 5 and 25 charecters').isLength({min: 5, max: 30}),

    // title
    check('title', 'Title is Required').notEmpty(),
    check('title', 'Title must be within 5 and 25 charecters').isLength({min: 5, max: 30}),

    // brand
    // check('brand', 'Brand is Required').notEmpty(),
    // check('brand', 'Brand must be within 5 and 25 charecters').isLength({min: 5, max: 30}),

    //price
    // check('price', 'Price must be a number').isNumeric(),

    // category
    check('category', 'Category is Required').notEmpty(),
    check('category', 'Category must be within 5 and 25 charecters').isLength({min: 5, max: 30}),

    //description
    check('description', 'Description is Required').notEmpty(),
    check('description', 'Description must be within 5 and 25 charecters').isLength({min: 5, max: 300}),

    //articalCode
    check('articalCode', 'Artical Code is Required').notEmpty(),
    check('articalCode', 'Artical Code must be within 5 and 25 charecters').isLength({min: 5, max: 25}),

    (req, res, next)=>{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
           return res.status(405).json({errors: errors.array()[0].msg})
        }

        next();
    }

]


// create category validator

exports.createCategoryValid = [
    // heading 
    check('heading', 'heading is Required').notEmpty(),
    check('heading', 'heading must be within 5 and 30 charecters').isLength({min: 5, max: 30}),

    //  slogan
    check('slogan', 'slogan is Required').notEmpty(),
    check('slogan', 'slogan must be within 5 and 30 charecters').isLength({min: 5, max: 30}),

    // //  img
    // check('img', 'img is Required').notEmpty(),
    // check('img', 'img must be within 5 and 30 charecters').isLength({min: 5, max: 30}),

    //  category
    check('category', 'category is Required').notEmpty(),
    check('category', 'category must be within 5 and 30 charecters').isLength({min: 5, max: 30}),


    (req, res, next)=>{
        const errors = validationResult(req)

        console.log('errors',errors)

        if(!errors.isEmpty()){
            return res.status(405).json({error: errors.array()[0].msg})
        }
        
        next();
    }
]
