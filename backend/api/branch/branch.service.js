
const dbService = require('../../services/db.service')


module.exports = {
    query
}


async function query() {
    const collection = await dbService.getCollection('branch')
    try {
        const branches = await collection.find().toArray();
        return branches

    } catch (err) {
        console.log('ERROR: cannot find branches')
        throw err;
    }
}
