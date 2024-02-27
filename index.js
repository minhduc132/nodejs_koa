const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const {koaBody} = require('koa-body')

// gửi tập tin koa-body sẽ nhận và xử lý data 
//phân tích nội dung đã gửi từ form data  và lưu trữ các tệp tin được tải lên
// vào thư mục đã chỉ định (./uploads) 

app.use(bodyParser());
app.use(koaBody({ multipart: true }));

// app.use(koaBody({  
//     multipart: true, // cho biết chứa data(form-data) và ở trường hợp này là tải tập tin lên 
//     formidable: {  //xử lý form-data 
//       uploadDir: './uploads', //đường dẫn đến file 
//       keepExtensions: true, //đặt là true để lưu trữ lại data  và file mỗi khi thêm mới data
//     },
//   }));
// var render = require('koa-views-render');
// app.use(render('home', { title : 'Home Page' }));

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
