const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "product not found",
        });
      }
      req.product = product;
      next();
    });
};

exports.createProductById = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtension = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }


    // destructure the fields
    const {name, description, price, category, stock} = fields;
    if(
        !name ||
        !description ||
        !price ||
        !category ||
        !stock 
    ){
        return res.status(400).json({
            error: "Please include all fields"
        })
    }

    //  todo restrictions on fields
    let product = new Product(fields);

    // handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: " file size too big!",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    // save to the db
    product.save((err, product) => {
        if(err){
            res.status(400).json({
                error: "Saving T-shirt in DB failed"
            })
        }
        res.json(product);
    })
  }); 
};


exports.getProduct = (req, res) => {
  req.product.photo = undefined
  return res.json(req.product)

}


// middleware
exports.photo = (req, res, next) => {
  if(req.product.photo.data){
    res.set("content-Type", req.product.photo.contentType)
    return res.send(req.product.photo.data)
  }
  next();
}