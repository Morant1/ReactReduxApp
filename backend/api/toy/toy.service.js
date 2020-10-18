
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}



async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('toy')
    try {
        const toys = await collection.find(criteria).toArray();
        return _sortToys(toys, filterBy.sort)

    } catch (err) {
        throw err;
    }
}


function _sortToys(toys, sortBy) {
    if (!sortBy) return toys
    return toys.sort((a, b) => {
        return a[sortBy] < b[sortBy] ? -1 : a[sortBy] < b[sortBy] ? 1 : 0;
    })

}




async function getById(toyId) {
    const collection = await dbService.getCollection('toy')
    try {
        const toy = await collection.findOne({ "_id": ObjectId(toyId) })
        return toy

    } catch (err) {
        console.log(`ERROR: while finding toy ${toyId}`)
        throw err;
    }
}


async function remove(toyId) {
    const collection = await dbService.getCollection('toy')
    try {
        await collection.deleteOne({ "_id": ObjectId(toyId) })
    } catch (err) {
        console.log(`ERROR: cannot remove toy ${toyId}`)
        throw err;
    }
}




async function update(toy) {
    const collection = await dbService.getCollection('toy')
    toy._id = ObjectId(toy._id);

    try {
        await collection.replaceOne({ "_id": toy._id }, toy)
        return toy
    } catch (err) {
        console.log(`ERROR: cannot update toy ${toy._id}`)
        throw err;
    }
}

async function add(toy) {
    const collection = await dbService.getCollection('toy')
    try {
        const newToy = await collection.insertOne(toy);
        return newToy;
    } catch (err) {
        console.log(`ERROR: cannot insert toy`)
        throw err;
    }
}



function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.name) {
        criteria.name = new RegExp(filterBy.name, 'ig');
    }
    if (filterBy.inStock === true || filterBy.inStock === false) {
        criteria.inStock = filterBy.inStock
    }

    if (filterBy.type) {
        criteria.type = filterBy.type
    }

    return criteria;
}




