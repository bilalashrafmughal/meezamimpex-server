const Product = require("../modals/product");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");

exports.getProducts = (req, res, next) => {
  Product.find({}, (err, products) =>
    res.status(200).json({ products })
  ).select("-img");
};

exports.deleteProduct = (req, res) => {
  if (req.productById) {
    let product = req.productById;
    product.remove((err, product) => {
      if (err)
        return res.status(400).json({ error: "Product Not Deleted...!" });
      return res
        .status(200)
        .json({ message: "Product Deleted Successfully...!" });
    });
  }
};

exports.productById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err) return res.status(404).json({ error: "Product Not Found" });

    req.productById = product;
    next();
  });
};

exports.getProductById = (req, res) => {
  if (req.productById) {
    return res.status(200).json({ product: req.productById });
  }

  return res.status(404).json({ error: "Product not found" });
};

exports.findWithCategoryId = (req, res) => {
  if (req.productByCatId) {
    return res.status(200).json({ products: req.productByCatId });
  }
};

exports.productByCatId = (req, res, next, id) => {
  Product.find({ categoryId: ObjectId(id) }, (err, products) => {
    if (err)
      return res.status(404).json({ error: "Category Not Exist with this Id" });

    req.productByCatId = products;
    next();
  }).select("-__v -img");
};

//  PRODUCT PHOTO

exports.getProductPhoto = (req, res) => {
  console.log("request come to get product photo");
  if (req.productById.img.data) {
    res.set("Content-Type", req.productById.img.contentType);
    return res.send(req.productById.img.data);
  }
};

// UPDATE PRODUCT

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err)
      return res.status(400).json({ error: "failed to parse update request" });

    let product = req.productById;
    product = _.extend(product, fields);
    product.updated = Date.now();

    if (files.img) {
      category.img.data = fs.readFileSync(files.img.path);
      category.img.contentType = files.img.type;
    }

    product.save((err, results) => {
      if (err) return res.status(400).json({ error: "failed to update" });

      return res.status(200).json({ product });
    });
  });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) return res.status(405).json({ error: "Picture does not Uploded" });
    let product = new Product(fields);

    if (files.img) {
      product.img.data = fs.readFileSync(files.img.path);
      product.img.contentType = files.img.type;
    }

    console.log("product", product);
    product.save((err, results) => {
      if (err) {
        return res.status(405).json({ error: err });
      }
      return res.status(200).json({ message: "Product Saved" });
    });
  });

  // const product = new Product(req.body)

  // product.save((err, product)=>{
  //     if(err || !product){
  //         return res.status(405).json({error: err})
  //     }

  //     return res.status(200).json({product: product})
  // })
};
