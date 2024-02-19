const Router = require('koa-router');
const router = new Router();

const {addNewProduct,searchNameProduct,updateProduct,deleteProduct} = require('../app/controller/ProductController');

// add data 
router.post('/addNewProduct', addNewProduct);

//search data theo name
router.get('/searchNameProduct/:name', searchNameProduct);

//edit data theo id
router.patch('/update/:id',updateProduct);

//delete data theo id
router.get('/delete/:id',deleteProduct);

module.exports = router;