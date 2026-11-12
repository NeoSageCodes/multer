const {Product} = require('../models');
const fs = require("fs");

exports.addProduct = async (req, res) => {
    try {
        const {productName, price, stock} = req.body;

        console.log("Body: ", req.body);
        console.log("File: ", req.file);

        if (!req.file) {
          return res.status(400).json({
            message: "Product must have an image",
          });
        };

        const file = req.file.path;

        const product = await Product.create({
          productName,
          price,
          stock,
          productImage: file
        });

        res.status(201).json({
            message: "Product added",
            data: product
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};


exports.getOneProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findByPk(id);

        if (!product) {
          return res.status(404).json({
            message: "Product not found.",
          });
        }

        res.status(200).json({
          message: "Product found.",
          data: product,
        });
    } catch (error) {
        res.status(500).json({
          message: error.message,
        });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const { productName, price, stock } = req.body;
        
        const product = await Product.findByPk(id);

        if (!product) {
            if (req.file) {
                try {
                  fs.unlinkSync(req.file.path);
                } catch (error) {
                  console.error(
                    "Failed to delete product image:",
                    error.message,
                  );
                }
            }
            return res.status(404).json({
            message: "Product not found.",
          });
        }

        const data = {
          productName,
          price,
          stock,
        };

        let oldFile;

        if (req.file) {
          oldFile = product.productImage;
          const file = req.file.path;
          data.productImage = file;
        }

          await product.update(data);

        if (req.file) {
          try {
            fs.unlinkSync(oldFile);
          } catch (error) {
            console.error("Failed to delete product image:", error.message);
          }
        };

        

        const updatedProduct = await Product.findByPk(id);

        res.status(200).json({
          message: "Product updated",
          data: updatedProduct,
        });

    } catch (error) {
        res.status(500).json({
          message: error.message,
        });
    }
};


exports.getAllProducts = async (req, res) => {
    try {
        const allProducts = await Product.findAll();

        res.status(200).json({
            message: `All products found and the total is ${allProducts.length}`,
            data: allProducts
        })
    } catch (error) {
        res.status(500).json({
          message: error.message,
        });
    }
};


exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findByPk(id);

        if (!product) {
          return res.status(404).json({
            message: "Product not found.",
          });
        }

        const filePath = product.productImage;

        await product.destroy();

        try {
            fs.unlinkSync(filePath);
        } catch (error) {
            console.error("Failed to delete product image:", error.message)
        }

        res.status(200).json({
          message: "Product deleted",
          data: product,
        });
    } catch (error) {
        res.status(500).json({
          message: error.message,
        });
    }
};