const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());
// var render = require('koa-views-render');
// app.use(render('home', { title : 'Home Page' }));

//  route từ file.js
const homeRoutes = require('./router/home');
const productRoutes = require('./router/product')


// Sử dụng routes từ home.js
app.use(homeRoutes.routes());
app.use(homeRoutes.allowedMethods());

// Sử dụng routes từ product.js
app.use(productRoutes.routes());
app.use(productRoutes.allowedMethods());

let PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
