const Router = require('koa-router');
const router = new Router();


const { create, update, get ,deleteData} = require('../app/controller/HomeController');

router.post('/create', create);
router.put('/post/:id', update);
router.get('/get/:id', get);
router.delete('/delete/:id',deleteData);

module.exports = router;
