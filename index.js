const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const {koaBody} = require('koa-body')

// gửi tập tin koa-body sẽ nhận và xử lý data 
//phân tích nội dung đã gửi từ form data  và lưu trữ các tệp tin được tải lên
// vào thư mục đã chỉ định (./uploads) 

app.use(bodyParser());
app.use(koaBody({ multipart: true }));

// middleware  check localhost không có key localhost ở header
app.use(async (ctx,next) => {
    if (ctx.request.headers.localhost) {
        let header = ctx.request.headers.localhost;
        console.log(header)
        await next();
    }else{
        ctx.body = { error: "header no localhost key"}
    }
  });
   
// middleware  check name Bien Nguyen
app.use(async (ctx,next) => {
    let name = ctx.request.body.name
    if(name === 'Nguyen' || name === 'Bien'){
        ctx.status = 400; 
        ctx.body = { error: "Error data name: Bien, Nguyen"};
    }
    await next();
  });

//  route từ file.js
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
