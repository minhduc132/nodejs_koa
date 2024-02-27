// productController.js
const Storage = require('../../storage.js');
// file
const FileStorage = require('../../fileStorage.js');
const storage = new Storage(new FileStorage('./data/product.json'));
const MonggoStorage = require('../../MonggoStorage.js');// monggodb
const storageMonggo = new Storage(new MonggoStorage());
class ProductController {
    async addNewProduct(ctx) {
        try {
            if(!ctx.query || Object.keys(ctx.query).length === 0){
                ctx.status = 400; 
                ctx.body = { error: "error data" };
                return;
            }
            const imageData = ctx.query;
            //const image = ctx.request.files.name;
             // gọi hàm saveFile luu file từ fileStorage
            const imagePath = await storage.strategy.saveFile(imageData);
           // const imagePathMonggo = await storageMonggo.strategy.addData(imagePath);
            ctx.body = imagePath;
           // ctx.body = imagePathMonggo;
        } catch (error) {
            ctx.body = { error: "error add user" };
        }
    }
    async updateProduct(ctx) {
        try {  
            // lay id 
            const productId = ctx.query.id;
            //lay tat ca ra 
            const product = ctx.query;
           
            // Cập nhật sản phẩm trong cơ sở dữ liệu bằng hàm
            const updatedProduct = await storage.update(productId, product,);
            ctx.body = updatedProduct;
        } catch (error) {
            ctx.status = 500;
            ctx.body = { error: "Error updating product" };
        }
    }

    async deleteProduct(ctx) {
        let filteredProducts = await storage.delete(ctx.params.id);
        ctx.body = filteredProducts;
    }
    async updateFile(ctx) {
            let fileUpdate = await storage.updateFile(ctx.request);
            ctx.body = fileUpdate;
          }
   
}

module.exports = new ProductController();

