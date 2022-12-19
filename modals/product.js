const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;
const { stringify } = require('uuid')

const productSchema = new mongoose.Schema({

    productName: {
        type: String,
        trim: true,
        required: true
    },
    title: {
        type: String,
        trim: true,
        required: true
    },
    brand: {
        type: String,
        trim: true,
    },
    price: {
        type: Number,
        trim: true
    },
    category: {
        type: String,
        trim: true,
        required: true
    },
    categoryId: {
        type: ObjectId,
        ref: 'Category'
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    img: {
        data: Buffer,
        contentType: String
    },
    articalCode: {
        type: String, 
        trim: true, 
        required: true
    },
    updated: {
        type: Date, 
        trim: true
    }

})

module.exports = mongoose.model('Product', productSchema)

// {
//     id: 1,
//     productName: 'shirt',
//     title: 'amazing Shirt with sleves',
//     brand: 'not specified',
//     price: '$70.00',
//     category: 'garments',
//     description: 'this is the description of product list and about the product',
//     img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSlz6MjefQ8zhwJMvfoPjWr9-PgtQ5jEiFqzg&usqp=CAU',
//     articalCode: 'SHRT-LG-03'
// },