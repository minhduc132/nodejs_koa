const Router = require('koa-router');
const router = new Router();


const { addNewHome, updateHome, searchNameHome ,deleteHome} = require('../app/controller/HomeController');

router.post('/addNewHome', addNewHome);

router.get('/searchNameHome/:id', searchNameHome);

router.put('/updateHome/:id', updateHome);

router.delete('/deleteHome/:id',deleteHome);

module.exports = router;
