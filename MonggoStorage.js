const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017'; 

// Tên của database
const dbName = 'dataProduct';
class MonggoStorage{

async  getAll(dbName) {
    const client = new MongoClient(url);
    try {
        // Kết nối tới MongoDB
        await client.connect();

        // Chọn database
        const db = client.db(dbName);

        // Chọn collection
        const collection = db.collection('products');

        // Lấy tất cả dữ liệu từ collection
        const result = await collection.find({}).toArray();
        
        console.log('All data:', result);
        return result;
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
    }
}

async  addData(dataAdd) {
    const client = new MongoClient(url);
    try {
        // Kết nối tới MongoDB
        await client.connect();

        // Chọn database
        const db = client.db(dbName);

        // Chọn collection
        const collection = db.collection('products');

        // Thêm dữ liệu vào collection
        await collection.insertOne(dataAdd);
        console.log('Data added successfully');
        return dataAdd;
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
    }
}

async  delete(data) {
    const client = new MongoClient(url);
    try {
        const database = client.db(dbName);
        const product = database.collection("products");
        // Query for a movie that has title "Annie Hall"
        const result = await product.deleteOne(data);
        if (result.deletedCount === 1) {
          console.log("Successfully deleted one document.");
        } else {
          console.log("No documents matched the query. Deleted 0 documents.");
        }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            await client.close();
        }
    }
}

module.exports =  MonggoStorage;

// // Dữ liệu muốn thêm vào
// const testData = { name: 'Product 1', price: 100 };

// // Thêm dữ liệu vào MongoDB
// addData(testData);

// // Lấy tất cả dữ liệu từ MongoDB
// getAll(dbName);
