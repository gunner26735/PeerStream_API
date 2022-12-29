const axios = require("axios");
const { response } = require("express");

exports.renderHome = (req,res)=>{
    res.render("index");
}

exports.renderStream = (req,res)=>{
    res.render("create_stream");
}

exports.renderWatch = (req,res)=>{
    res.render("watch_stream");
}