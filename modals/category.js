const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    heading: {
        type: String,
        trim: true, 
        required: true
    },
    slogan: {
        type: String,
        trim: true, 
        required: true
    },
    img: {
        data: Buffer,
        contentType: String
    },
    category: {
        type: String,
        trim: true,
        required: true
    },
    updated: {
        type: Date,
        trim: true
    }
    

})


module.exports = mongoose.model('Category', categorySchema);

// {
//     id: 1,
//     heading: "Sports",
//     slogan: 'we offer best',
//     img: serviceCat1,
//     category: 'sports'
// },