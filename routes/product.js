const router = require("express").Router();
const upload = require("../middleware/multer");
const {
  addProduct,
  updateProduct,
  getOneProduct,
  getAllProducts,
  deleteProduct,
} = require("../controllers/product");


router.post("/product", upload.single('productImage'), addProduct);
router.get("/product/:id", getOneProduct);
router.get("/product", getAllProducts);
router.patch("/product/:id", upload.single('productImage'), updateProduct);
router.delete("/product/:id", deleteProduct);

module.exports = router
