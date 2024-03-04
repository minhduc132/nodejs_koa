const Router = require('koa-router');
const router = new Router();



const {addNewProduct,updateProduct,deleteProduct,updateFile,product} = require('../app/controller/ProductController');

// add data 
router.post('/addNewProduct', addNewProduct);

//edit data theo id
router.put('/updateProduct/:id',updateProduct);

//delete data theo id
router.post('/deleteProduct/:id',deleteProduct);

//update Image 
router.post('/uploadFile', updateFile)

//api trả về data
router.get('/product', product)


module.exports = router;