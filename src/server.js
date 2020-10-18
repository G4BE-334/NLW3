// Import plugins
const express = require('express');
const server = express()

const path = require('path');
const pages = require('./pages.js');

server
    // Utilize body from request object
    .use(express.urlencoded({extended: true}))

    // Utilizing statics archives
    .use(express.static('public'))

    // Configure template engine
    .set('views', path.join(__dirname, "views")) // dirname here gives the directory ur at
    .set('view engine', 'hbs') // Handlebars (hbs) lets you make dinamic changes to html

    // Make the path
    .get('/', pages.index)
    .get('/orphanage', pages.orphanage)
    .get('/orphanages', pages.orphanages)
    .get('/create-orphanage', pages.createOrphanage)
    .get('/donate', pages.donate)
    .post('/save-orphanage', pages.saveOrphanage)

// Turn on the server
server.listen(5500)