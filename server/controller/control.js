const streamerDB = require('../model/model_streamer')

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
        isStreaming : req.body.setStream
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

/**
 * 
 * <p>s1</p>
 * <p>s2</p>
 * <p>s3</p>
 * 
 */