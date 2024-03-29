
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
class FileStorage {
    constructor(filePath) {
        this.filePath = filePath;
        console.log("call FileStorageStrategy");
    }

    async getData(ctx){
        try {
            const template = await fs.promises.readFile("view/home.hbs", "utf-8");
            const compiledTemplate = handlebars.compile(template);
            const html = compiledTemplate({ data: ctx.data, imagePaths: ctx.images });   
          return html;
        } catch (err) {
            console.error('Error reading Handlebars template:', err);
        }   
    }

    async add(data) {
        let rawData = fs.readFileSync(this.filePath);
        let products ;
            try {
                products = JSON.parse(rawData)
            } catch (error) {
            
                products = []
            }      
        products.push(data);
         fs.writeFileSync(this.filePath, JSON.stringify(products));
        return products;
    }

    async saveFile(imageFile) {
             let rawData = fs.readFileSync(this.filePath, 'utf-8');
             let testArray ;
             try {
                 testArray = JSON.parse(rawData)
             } catch (error) {
             
                 testArray = []
             }      
       
             testArray.push(imageFile)
            // const fileName = generateUniqueFileName(imageFile);           
            fs.writeFileSync(this.filePath, JSON.stringify(testArray));        
            return imageFile;
        }
    
    async search(query) {
        let rawData = fs.readFileSync(this.filePath);
        let products = JSON.parse(rawData);
        return products.filter(product => product.name === query);
    }

    
    async update(id, newData) {
        let rawData = fs.readFileSync(this.filePath);
        let products;
        try {
            products = JSON.parse(rawData);
        } catch (error) {
            products = [];
        }
         let productToUpdate = products.filter(product => product.id === id); 
        // Duyệt qua từng phần tử trong mảng filteredProducts và cập nhật thuộc tính mới
        // update lai  cac phan name,quantity
        productToUpdate.forEach(product => {
            product.name = newData.name;
            product.address= newData.address;
            product.quantity = newData.quantity;
        });
        let outProduct = products.filter(product => product.id !== id)

            fs.writeFileSync(this.filePath, JSON.stringify(outProduct.concat(productToUpdate)));  
            return productToUpdate;
    }

    async updateFile(data) {
        try {
            const file = data.files.image.filepath;// file image
            const name = data.body.name; // data đi kèm   
            // Đường dẫn đến thư mục lưu trữ file và tên file
            const filePath = path.join(__dirname, 'uploads', `${name}.jpg`);
  
            //đọc data  file ảnh 
            fs.readFile(file, (err, imageData) => {
                if (err) {
                    console.error('Lỗi khi đọc file ảnh:', err);
                    return;
                }
                // Ghi dữ liệu vào file mới
                fs.writeFile(filePath, imageData, (err) => {
                    if (err) {
                        console.error('Lỗi khi ghi file mới:', err);
                        return;
                    }
                    console.log(`Đã thêm file ${name}.jpg vào thư mục uploads thành công`);
                });
            });
        } catch (error) {
            console.error('Lỗi khi thêm file:', error);
        }
    }

    async delete(id) {
        let rawData = fs.readFileSync(this.filePath);
        let products;
        try {
            products = JSON.parse(rawData);
        } catch (error) {
            products = [];
        }
        
        let filteredData = products.filter(product => product.id == id);
        let deleteData = products.filter(item => !filteredData.includes(item))
         fs.writeFileSync(this.filePath, JSON.stringify(deleteData));
        return deleteData;
    }

}

module.exports = FileStorage;
