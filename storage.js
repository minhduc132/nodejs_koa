// storage.js
class Storage {
    constructor(strategy) {
        this.strategy = strategy;
        console.log("call Storage");
    }

    async add(data) {
        return await this.strategy.add(data);
    }

    async search(query) {
        return await this.strategy.search(query);
    }

    async update(id, newData) {
        return await this.strategy.update(id, newData);
    }

    async delete(id) {
        return await this.strategy.delete(id);
    }
}

module.exports =  Storage;
