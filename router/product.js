const Router = require('koa-router');
const router = new Router();

const {add,search,updateProduct,deleteProduct,index} = require('../app/controller/ProductController');

router.post('/index',index);
router.post('/add', add);
router.get('/search/:name', search);
router.patch('/update/:id',updateProduct);
router.get('/delete/:id',deleteProduct);

module.exports = router;