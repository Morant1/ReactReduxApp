const branchService = require('./branch.service')
const logger = require('../../services/logger.service')



async function getBranches(req, res) {
    const branches = await branchService.query(req.query)
    logger.debug(branches);
    res.send(branches)
}


module.exports = {
    getBranches
}