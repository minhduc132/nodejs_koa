 let fs = require('fs')
 class ProductController{
         
    async add(ctx) {
        let text = fs.readFileSync('C:/nodeJsW3/product.json');
        let create;
        try {
            create = JSON.parse(text)
        } catch (error) {
            create = []
        }
        create.push(ctx.request.body)
        //  tạo file khi chưa có  đẩy data vào file đó khi file đã có 
        fs.writeFile('product.json', JSON.stringify(create), function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
        ctx.body = create;
    }
   
    async search(ctx) {
        let text = fs.readFileSync('C:/nodeJsW3/product.json');
        let create;
        try {
            create = JSON.parse(text)
        } catch (error) {
            create = []
        }
        create.push(ctx.request.body)
        let search = create.filter(i => i.name == ctx.params.name)
        ctx.body = search 
    }

    async updateProduct(ctx) {
        let text = fs.readFileSync('C:/nodeJsW3/product.json');
        let add;
        console.log(ctx.params.id)
        try {
            add = JSON.parse(text)
        } catch (error) {
            add = []
        }
        let updateData = add.find(i => i.id == ctx.params.id)
        updateData.name = ctx.request.body.name
        updateData.address = ctx.request.body.address
        let data;
        data = add.filter(i => i.id != ctx.params.id)
        data.push(updateData)
        fs.writeFile('product.json', JSON.stringify(data), function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
        ctx.body = updateData;
    }
    
    async index(ctx) {
        let text = fs.readFileSync('C:/nodeJsW3/product.json');
        let add;
        try {
            add = JSON.parse(text)
        } catch (error) {
            add = []
        }
        ctx.body = add
    }
    async deleteProduct(ctx){
        let text = fs.readFileSync('C:/nodeJsW3/product.json');
        let add;
        try {
            add = JSON.parse(text)
        } catch (error) {
            add = []
        }
        let updateData =  add.filter(i=> i.id == ctx.params.id)
        const filteredItems = add.filter(item => !updateData.includes(item))//kiem tra xem co ko  trong add, include tra về boolean 
        ctx.body = filteredItems;    
       } 
 }
 module.exports = new ProductController();
