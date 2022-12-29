const express = require('express');
const route = express.Router();

const services = require('../services/render')
const controller = require('../controller/control')

//api calls
route.post('/api/streamer',controller.createStreamer)//TO create Streamer for first time
route.get('/api/streamer/:wAddress',controller.isStreamer)//first time or not
route.post('/api/u_streamer',controller.update)//To update an existing streamer
route.get('/api/live',controller.getStreamers)//To get streamer who are streaming currently
route.get('/api/liststreamer',controller.allStreamers)//To get all the streamer



module.exports = route