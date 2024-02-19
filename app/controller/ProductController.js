// productController.js
const Storage = require('../../storage.js');
const FileStorageStrategy = require('../../fileStorageStrategy.js');

const storage = new Storage(new FileStorageStrategy('./product.json'));
class ProductController {


    async addNewProduct(ctx) {
        let newProduct = await storage.add(ctx.request.body);
        ctx.body = newProduct;
    }

    async searchNameProduct(ctx) {
        let searchResult = await storage.search(ctx.params.name);
        ctx.body = searchResult;
    }

    async updateProduct(ctx) {
        let updatedProduct = await storage.update(ctx.params.id, ctx.request.body);
        ctx.body = updatedProduct;
    }

    async deleteProduct(ctx) {
        let filteredProducts = await storage.delete(ctx.params.id);
        ctx.body = filteredProducts;
    }
}

module.exports = new ProductController();





// let fs = require('fs')
//  class ProductController{
  
//     async addNewProduct(ctx) {
//         let text = fs.readFileSync('./product.json', 'utf8');
//         let newProduct;
//         try {
//             newProduct = JSON.parse(text)
//         } catch (error) {
//             newProduct = []
//         }
//         newProduct.push(ctx.request.body)
//         fs.writeFile('product.json', JSON.stringify(newProduct), function (err) {
//             if (err) throw err;
//             console.log('Saved!');
//         });
//         ctx.body = newProduct;
//     }

//     async searchNameProduct(ctx) {
//         let text = fs.readFileSync('./product.json', 'utf8');
//         let name;
//         try {
//             name = JSON.parse(text)
//         } catch (error) {
//             name = []
//         }
//         name.push(ctx.request.body)
//         let search = create.filter(i => i.name == ctx.params.name)
//         ctx.body = search 
//     }
    
//     async updateProduct(ctx) {
//         let text = fs.readFileSync('./product.json', 'utf8');
//         let update;
//         console.log(ctx.params.id)
//         try {
//             update = JSON.parse(text)
//         } catch (error) {
//             update = []
//         }
//         let updateData = update.find(i => i.id == ctx.params.id)
//         updateData.name = ctx.request.body.name
//         updateData.address = ctx.request.body.address
//         let product;
//         product = update.filter(i => i.id != ctx.params.id)
//         product.push(updateData)
//         fs.writeFile('product.json', JSON.stringify(product), function (err) {
//             if (err) throw err;
//             console.log('Saved!');
//         });
//         ctx.body = updateData;
//     }
    
//     async deleteProduct(ctx){
//         let text = fs.readFileSync('./product.json', 'utf8');
//         let deleteProduct;
//         try {
//             deleteProduct = JSON.parse(text)
//         } catch (error) {
//             deleteProduct = []
//         }
//         let updateData =  deleteProduct.filter(i=> i.id == ctx.params.id)
//         const filteredItems = deleteProduct.filter(item => !updateData.includes(item))//kiem tra xem co ko  trong updateData, include tra về boolean 
//         ctx.body = filteredItems;    
//        } 

//  }
//  module.exports = new ProductController();



