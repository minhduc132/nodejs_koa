// productController.js
const Storage = require('../../storage.js');
const FileStorage = require('../../fileStorage.js');
const storage = new Storage(new FileStorage('./data/user.json'));

class UserController {

    async addUser(ctx) {
        try {
        // hợp lệ thêm mới 
        let newProduct = await storage.add(ctx.request.body);
        ctx.body = newProduct;
        } catch (error) {
            ctx.body = { error: "error add user" };
            return;
        }
    }
    
    async searchUser(ctx) {
      
        let searchResult = await storage.search(ctx.params.name);
        ctx.body = searchResult;
    }
    async updateUser(ctx) {
        if(!ctx.request.body || Object.keys(ctx.request.body).length === 0){
            ctx.status = 400; 
            ctx.body = { error: "error data" };
            return;
        }
        let updatedUser = await storage.update(ctx.params.id, ctx.request.body);
        ctx.body = updatedUser;
        } catch (error) {
            ctx.body = { error: "error add user" };
        }
     
    async deleteUser(ctx) {
    
        let filteredProducts = await storage.delete(ctx.params.id);
        ctx.body = filteredProducts;
        }
}
module.exports = new UserController();
