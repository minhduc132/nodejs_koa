const Router = require('koa-router');
const router = new Router();


const {addUser,searchUser,updateUser,deleteUser} = require('../app/controller/UserController');

router.post('/addUser', addUser);

router.post('/searchUser/:name', searchUser);

router.put('/updateUser/:id', updateUser);

router.get('/deleteUser/:id', deleteUser);
module.exports = router;
