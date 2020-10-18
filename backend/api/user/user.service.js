
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getByUsername,
    add
}

async function query() {
    const collection = await dbService.getCollection('user')
    try {
        const users = await collection.find().toArray();
        users.forEach(user => delete user.password);
        return users

    } catch (err) {
        console.log('ERROR: cannot find users')
        throw err;
    }
}


async function add(user) {
    const collection = await dbService.getCollection('user')
    try {
        await collection.insertOne(user);
        console.log("add,user-service",user)
        return user;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}

async function getByUsername(username) {
    const collection = await dbService.getCollection('user')
    try {
        const user = await collection.findOne({ username })
        return user
    } catch (err) {
        console.log(`ERROR: while finding user ${username}`)
        throw err;
    }
}

