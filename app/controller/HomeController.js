
const Storage = require('../../storage.js');
const FileStorageStrategy = require('../../fileStorageStrategy.js');

const storage = new Storage(new FileStorageStrategy('./data.json'));
class HomeController {

    async addNewHome(ctx) {
        let newProduct = await
         storage.add(ctx.request.body);
        ctx.body = newProduct;
    }

    async searchNameHome(ctx) {
        let searchResult = await
         storage.search(ctx.params.name);
        ctx.body = searchResult;
    }

    async updateHome(ctx) {
        let updatedProduct = await 
        storage.update(ctx.params.id, ctx.request.body);
        ctx.body = updatedProduct;
    }

    async deleteHome(ctx) {
        let filteredProducts = await 
        storage.delete(ctx.params.id);
        ctx.body = filteredProducts;
    }
}

module.exports = new HomeController();





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





















// let fs = require('fs');
// class HomeController {

//     async addNewDataHome(ctx) {
//         let text = fs.readFileSync('./data.json', 'utf-8');
//         let saveData;
//         try {
//             saveData = JSON.parse(text)
//         } catch (error) {
//             saveData = []
//         }
//         saveData.push(ctx.request.body)
//         fs.writeFile('data.json', JSON.stringify(saveData), function (err) {
//             if (err) throw err;
//             console.log('Saved!');
//         });
//         console.log(ctx.request.body)
//         ctx.body = saveData;
//     }
    
//     async updateDataHome(ctx) {
//         let text = fs.readFileSync('./data.json', 'utf-8');
//         let Saved;
//         console.log(ctx.params.id)
//         try {
//             Saved = JSON.parse(text)
//         } catch (error) {
//             Saved = []
//         }
//         let updateData = Saved.find(i => i.id == ctx.params.id)
//         updateData.name = ctx.request.body.name
//         let data;
//         data = add.filter(i => i.id != ctx.params.id)
//         data.push(updateData)
//         fs.writeFile('data.json', JSON.stringify(data), function (err) {
//             if (err) throw err;
//             console.log('Saved!');
//         });
//         ctx.body = updateData;
//     }

//     async getDataHome(ctx) {
//         let text = fs.readFileSync('./data.json', 'utf-8');
//         let getData;
//         console.log(ctx.params.id)
//         try {
//             getData = JSON.parse(text)
//         } catch (error) {
//             getData = []
//         }
//         let data = getData.find(i => i.id == ctx.params.id)
//         ctx.body = data;
//     }

//     async deleteData(ctx) {
//         let text = fs.readFileSync('./data.json', 'utf-8');
//         let remove;
//         try {
//             remove = JSON.parse(text)
//         } catch (error) {
//             remove = []
//         }

//         //c1
//         //    let updateData =  add.findIndex(i=> i.id == ctx.params.id)
//         // add.splice(updateData, 1);
//         //ctx.body = add;     

//         //c2 
//         //   let updateData =  add.filter(i=> i.id == ctx.params.id)
//         //   const filteredItems = add.filter(item => !updateData.includes(item))
//         //    ctx.body = filteredItems;     

//         c3
//         let updateData =  remove.filter(i=> i.id == ctx.params.id)
//         remove = remove.filter(function(item){
//             return item.id !== updateData 
//         });
//         ctx.body = remove;     
      
//     }
// }
// module.exports = new HomeController();
