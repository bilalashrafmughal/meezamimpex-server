const Category = require('../modals/category')
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');
const { isError } = require('lodash');

exports.catById = (req, res, next, id)=>{
    Category.findById(id)
    .exec((err , category)=>{
        
        if(err) return res.status(404).json({error: "category not found"})
        req.catById = category
        next()
    })

}

exports.getCategoryPhoto = (req, res)=>{
 if(req.catById.img.data){
     res.set("Content-Type", req.catById.img.contentType)
     return res.send(req.catById.img.data)
 }



}


exports.getCategories =  (req, res)=>{
 
    Category.find({}, (err,categories)=>{
        if(err) return res.status(404).json({error: 'No Record Found...!'})
        return res.status(200).json({categories: categories})
    }).select('-img')
}

// exports.createcategory = (req, res)=>{
//     const category = new Category(req.body)

//     category.save((err, category)=>{
//         if(err || !category){
//             return res.status(422).json({error: "Data doesn't saved something problem occured"})
//         }

//         return res.status(200).json({category: category})
//     })
// }

exports.createcategory = (req, res)=>{
    let form = new formidable.IncomingForm()
    
    form.keepExtensions = true; 

    form.parse(req, (err, fields, files)=>{
        console.log('error', err, fields, files)
        if(err){
            return res.status(405).json({error: 'Picture does not Uploded'})
        }
        let category = new Category(fields)
        if(files.img){
            category.img.data = fs.readFileSync(files.img.path)
            category.contentType = files.img.type

            console.log('category is here', category)
        }

        category.save((err, results)=>{ 
            
            if(err){
                return res.status(403).json({error: 'category not saved'})
            }
             return res.status(200).json({results})
        })
    })

}

// UPDATE CATEGORY

exports.updateCategory = (req, res)=>{
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    
    form.parse(req, (err, fields, files)=>{
        if(err) return res.status(400).json({error: 'failed to parse Request'})
        let category = req.catById
        category = _.extend(category, fields)
        category.updated =  Date()

        if(files.img){
            category.img.data = fs.readFileSync(files.img.path)
            category.img.contentType = files.img.type
        }

        category.save((err, result)=>{
            if(err) return res.status(400).json({error: 'failed to Update Category'})

            
                return res.status(200).json({category})
            
        })
    })
}

exports.getCategory = (req, res)=>{
    if(req.catById){
        return res.status(200).json({category: req.catById})
    }
    return res.status(400).json({error: 'No Record Found...!'})
}

exports.deletecategory = (req, res)=>{
    let catById = req.catById
    catById.remove((err, category)=>{
        if(err) return res.status(400).json({error: 'Category Not Deleted'})

        return res.status(200).json({category: category})
    })
}