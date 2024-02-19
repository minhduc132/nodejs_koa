// fileStorageStrategy.js
const fs = require('fs');

class FileStorageStrategy {
    constructor(filePath) {
        this.filePath = filePath;
        console.log("call FileStorageStrategy");
    }
    
    async add(data) {
        let rawData = fs.readFileSync(this.filePath);
        let products = JSON.parse(rawData);
        products.push(data);
        fs.writeFileSync(this.filePath, JSON.stringify(products));
        return data;
    }

    async search(query) {
        let rawData = fs.readFileSync(this.filePath);
        let products = JSON.parse(rawData);
        return products.filter(product => product.name === query);
    }

    async update(id, newData) {
        let rawData = fs.readFileSync(this.filePath);
        let products = JSON.parse(rawData);
        let index = products.findIndex(product => product.id === id);
        if (index !== -1) {
            products[index] = newData;
            fs.writeFileSync(this.filePath, JSON.stringify(products));
            return newData;
        }
        return null;
    }

    async delete(id) {
        let rawData = fs.readFileSync(this.filePath);
        let products = JSON.parse(rawData);
        let filteredProducts = products.filter(product => product.id !== id);
        fs.writeFileSync(this.filePath, JSON.stringify(filteredProducts));
        return filteredProducts;
    }
}

module.exports = FileStorageStrategy;
