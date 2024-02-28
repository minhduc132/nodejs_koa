// fileStorageStrategy.js
const fs = require('fs');
const path = require('path');


class FileStorage {
    constructor(filePath) {
        this.filePath = filePath;
        console.log("call FileStorageStrategy");
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
         let productToUpdate = products.filter(product => product.id === parseInt(id)); 
        // Duyệt qua từng phần tử trong mảng filteredProducts và cập nhật thuộc tính mới
        // update lai  cac phan name,quantity
       if(productToUpdate !== -1){
        productToUpdate.forEach(product => {
            product.name = newData.name;
            product.address= newData.address;
            product.quantity = newData.quantity;
        });
            fs.writeFileSync(this.filePath, JSON.stringify(products));  
            return productToUpdate;
        }
    }

    async updateFile(data) {
        try {
            const file = data.files.image;// file image
            const name = data.body.name; // data đi kèm 
    
            // Đường dẫn đến thư mục lưu trữ file và tên file
            const filePath = `./uploads/${name}.json`;
    
            // Ghi dữ liệu vào file
            fs.writeFile(filePath, JSON.stringify(file), (err) => {
                if (err) {
                    console.error('Lỗi khi ghi file:', err);
                    return;
                }
                console.log(`Đã thêm file ${name}.json vào thư mục uploads thành công`);
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
        
        let filteredData = products.filter(product => product.id == parseInt(id));
        let deleteData = products.filter(item => !filteredData.includes(item))
         fs.writeFileSync(this.filePath, JSON.stringify(deleteData));
        return deleteData;
    }

}

module.exports = FileStorage;
