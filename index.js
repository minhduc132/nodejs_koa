const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const { koaBody } = require('koa-body');
const koaStatic = require('koa-static');
const fs = require('fs').promises;
const path = require('path');

app.use(bodyParser());

app.use(koaBody({ multipart: true }));

// Middleware kiểm tra body không được trống
app.use(async (ctx, next) => {
    if (ctx.method === 'POST') {
        if (ctx.request.body && Object.keys(ctx.request.body).length === 0) {
            ctx.body = { error: "body null" }
        }
    }
    await next();
});

// Middleware kiểm tra tên là Bien ,Nguyen
app.use(async (ctx, next) => {
    if (ctx.method === 'POST') {
    let name = ctx.request.body?.name
    if (name === 'Nguyen' || name === 'Bien') {
        ctx.body = { error: "Error data name: Bien, Nguyen" };
    }
}
    await next();

});

// Middleware kiểm tra localhost không có khóa localhost trong header
app.use(async (ctx, next) => {
    if (ctx.method === 'POST') {
    if (!ctx.request.headers.localhost) {
        let header = ctx.request.headers.localhost;
        console.log(header)
    }
}
   await next();
});


// Thư mục chứa ảnh
const imageFolder = path.join(__dirname, 'uploads');
// sử dụng các tập tĩnh trong file image
app.use(koaStatic(imageFolder));
//Middleware để cung cấp dữ liệu
app.use(async (ctx, next) => {
    try { 
        const data = await fs.readFile('./data/product.json', 'utf-8');
        ctx.state.data = JSON.parse(data); //gán data theo kiểu json

         // Lấy danh sách các tệp ảnh từ thư mục
         const imageFiles = await fs.readdir(imageFolder);
        
         // Gán danh sách ảnh vào context
         ctx.state.images = imageFiles;

        await next();
    } catch (err) {
        console.error('Error reading JSON file:', err);
        ctx.status = 500;
        ctx.body = 'Internal Server Error';
    }
});


// Route từ file.js
const homeRoutes = require('./router/home');
const productRoutes = require('./router/product')
const userRoutes = require('./router/user')

// Sử dụng routes từ home.js
app.use(homeRoutes.routes());
app.use(homeRoutes.allowedMethods());

// Sử dụng routes từ product.js
app.use(productRoutes.routes());
app.use(productRoutes.allowedMethods());

// Sử dụng routes từ user.js
app.use(userRoutes.routes());
app.use(userRoutes.allowedMethods());

let PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
