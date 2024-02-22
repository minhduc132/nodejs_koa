const Router = require('koa-router');
const router = new Router();



const {addNewProduct,updateProduct,deleteProduct} = require('../app/controller/ProductController');

// add data 
router.post('/addNewProduct', addNewProduct);


//edit data theo id
router.put('/updateProduct/:id',updateProduct);

//delete data theo id
router.get('/deleteProduct/:id',deleteProduct);

module.exports = router;