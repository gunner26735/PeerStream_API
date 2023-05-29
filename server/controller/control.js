const streamerDB = require('../model/model_streamer');
const watcherDB = require('../model/model_watcher');
/*
TO create new Streamer
*/
exports.createStreamer = (req,res)=>{
    
    if(!req.body){
        res.status(400).send({message:'content cannot be empty'});
        return;
    }
    // create users

    var streamer = new streamerDB({
        walletAddress : req.body.walletAddress,
        streamName : req.body.streamName,
        streamInfo : req.body.streamInfo,
        playbackId : req.body.playbackId,
        isStreaming : req.body.setStream,
        flowrate : req.body.flowrate
    })

    streamer
    .save(streamer)
    .then(data=>{
        res.status(200).send({message:"Data inserted successfully"})
    }).catch(err=>{
        res.status(500).send({message:"Some ERROR"})
        return;
    })

}

exports.isStreamer = (req,res)=>{
    if(req.params.wAddress){
        let wadd  = req.params.wAddress;
        streamerDB.findOne({walletAddress : wadd}).then(data=>{
            if(!data){
                res.status(200).send(false)
            }else{
                res.send(data);
            }
        }).catch(err=>{
            res.status(500).send({message:err.message || "some error occurred in finding Wallet."})
        })

    }
    else{
        res.status(400).send({message:err.message || "some error in query."})
    }
}

exports.update = (req,res)=>{
    streamerDB.findOneAndUpdate(
        { walletAddress : req.body.walletAddress }, //for filter
        { 
            walletAddress : req.body.walletAddress,
            streamName : req.body.streamName,
            streamInfo : req.body.streamInfo,
            playbackId : req.body.playbackId,
            isStreaming : req.body.isStreaming,
        },
        (err)=>{
            if(err){
                res.status(400).json({error:"Something went wrong"})
            } else {
                res.status(200).json({message:"Streamer updated successfully"})
            }
        }
    )
}

exports.getStreamers = (req,res)=>{
    streamerDB.find({isStreaming : true}).then(data=>{
        if(!data){
            res.status(404).send(false)
        }else{
            res.send(data);
        }
    }).catch(err=>{
        res.status(500).send({message:err.message || "some error occurred "})
    })
}

exports.allStreamers = (req,res)=>{
    streamerDB.find().then(data=>{
        if(!data){
            res.status(404).send(false)
        }else{
            res.send(data);
        }
    }).catch(err=>{
        res.status(500).send({message:err.message || "some error occurred "})
    })
}

// To set watcher & streamer pair
exports.setWatcher = (req,res) =>{
    if(!req.body){
        res.status(400).send({message:'content cannot be empty'});
        return;
    }

    var watcher = watcherDB.updateOne(
        {
            walletAddress : req.body.walletAddress,
            playbackId : req.body.playbackId,
        },
        {
        walletAddress : req.body.walletAddress,
        playbackId : req.body.playbackId,
        isWatching : req.body.iswatching,
        },
        {upsert : true},
        (err)=>{
            if(err){
                res.status(400).json({error:"Something went wrong"})
            } else {
                res.status(200).json({message:"Streamer updated successfully"})
            }
        }
    )
}

//It will return all watchers detail of current p_id
exports.watcherCount = (req,res) =>{
    console.log("IN WATCHER");
    if(req.body.p){
        const p_id = req.body.p;
        watcherDB.find({playbackId : p_id}).then(data => {
            if(!data){
                res.status(404).send(false)
            }else{
                res.send(data);
            }
        }).catch(err=>{
            res.status(500).send({message:err.message || "some error occurred "})
        })
    }
    else{
        res.status(400).json({message:"Something missing"});
    }
}