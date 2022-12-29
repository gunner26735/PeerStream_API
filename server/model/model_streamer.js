const mongo = require('mongoose')

var schema = new mongo.Schema({
    walletAddress : {
        type : String,
    },
    streamName : {
        type : String,
        default : ''
    },
    streamInfo : {
        type : String,
        default : ''
    },
    playbackId : {
        type : String,
        default : ''
    },
    isStreaming : {
        type : Boolean,
        default : true
    },
    totalEarning : {
        type : Number,
        default : 0
    }

}) 

const streamerDB  = mongo.model('ps_streamerdb',schema)

module.exports = streamerDB