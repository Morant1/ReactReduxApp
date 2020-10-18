const toyService = require('./toy.service')
const logger = require('../../services/logger.service')


// GET SINGLE
async function getToy(req, res) {
    const toy = await toyService.getById(req.params.id)
    res.send(toy)
}

 //GET LIST

async function getToys(req, res) {
    const filterBy = req.query;
    if (filterBy.inStock === 'true') filterBy.inStock = true;
    if (filterBy.inStock === 'false') filterBy.inStock = false;

    const toys = await toyService.query(filterBy)
    logger.debug(toys);
    res.send(toys)
}


// REMOVE
async function deleteToy(req, res) {
    await toyService.remove(req.params.id)
    res.end()
}

//UPDATE
async function updateToy(req, res) {
    const toy = {...req.body};
    console.log("toyController,update",toy)
    await toyService.update(toy)
    res.send(toy)
}

//ADD
async function addToy(req, res) {
    const toy = {...req.body};
    toy.createdAt = Date.now();
    await toyService.add(toy)
    res.send(toy)
}

module.exports = {
    getToy,
    getToys,
    deleteToy,
    updateToy,
    addToy
}