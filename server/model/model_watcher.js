const mongo = require('mongoose')

var schema = new mongo.Schema({
    walletAddress : {
        type : String
    },
    playbackId : {
        type : String
    },
    isWatching : {
        type : Boolean
    }
})

const watcherDB = mongo.model('ps_watcherdb',schema);

module.exports = watcherDB;