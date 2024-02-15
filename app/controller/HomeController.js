let fs = require('fs');
class HomeController {

    async create(ctx) {
        let text = fs.readFileSync('C:/nodeJsW3/data.json', 'utf-8');
        let add;
        try {
            add = JSON.parse(text)
        } catch (error) {
            add = []
        }
        add.push(ctx.request.body)
        fs.writeFile('data.json', JSON.stringify(add), function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
        console.log(ctx.request.body)
        ctx.body = add;
    }
    
    
    async update(ctx) {
        let text = fs.readFileSync('C:/nodeJsW3/data.json', 'utf-8');
        let add;
        console.log(ctx.params.id)
        try {
            add = JSON.parse(text)
        } catch (error) {
            add = []
        }
        let updateData = add.filter(i => i.id == ctx.params.id)
        updateData.name = ctx.request.body.name
        let data;
        data = add.filter(i => i.id != ctx.params.id)
        data.push(updateData)
        fs.writeFile('data.json', JSON.stringify(data), function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
        ctx.body = updateData;
    }

    async get(ctx) {
        let text = fs.readFileSync('C:/nodeJsW3/data.json', 'utf-8');
        let add;
        console.log(ctx.params.id)
        try {
            add = JSON.parse(text)
        } catch (error) {
            add = []
        }
        let data = add.find(i => i.id == ctx.params.id)
        ctx.body = data;
    }

    async deleteData(ctx) {
        let text = fs.readFileSync('C:/nodeJsW3/data.json', 'utf-8');
        let add;
        try {
            add = JSON.parse(text)
        } catch (error) {
            add = []
        }

        //c1
        //    let updateData =  add.findIndex(i=> i.id == ctx.params.id)
        // add.splice(updateData, 1);
        //ctx.body = add;     

        //c2 
        //   let updateData =  add.filter(i=> i.id == ctx.params.id)
        //   const filteredItems = add.filter(item => !updateData.includes(item))
        //    ctx.body = filteredItems;     

        c3
        let updateData =  add.filter(i=> i.id == ctx.params.id)
        add = add.filter(function(item){
            return item.id !== updateData 
        });
        ctx.body = add;     
      
    }
}
module.exports = new HomeController();
