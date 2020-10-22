const express = require('express')
const random = require('random')
const schedule = require('node-schedule');
const app = express();
const port = 8080;
const HOST = '0.0.0.0';

let test = '3'
//var j = schedule.scheduleJob('1 0 * * *', function () {
//    test = random.int(2, 5);    
//    return test;
//});

var process = require('process')
process.on('SIGINT', () => {
  console.info("Interrupted")
  process.exit(0)
})


app.get('/', (req, res) => {
    
    //if first run than generate random
    //if (test === '') {
    //    test = random.int(2, 5);
    //}

    res.setHeader('Content-Type', 'application/json');
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    //console.log(JSON.stringify(req.headers));
    res.json({
        randomNumber: parseInt(test),
        Ip: ip
    });
})

app.get('/scrapeintervals', (req, res) => {
    
    let hotelScrapeInterval = 60
    let chainScrapeInterval = 300
    let cityScrapeInterval = 600

    res.setHeader('Content-Type', 'application/json');
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    res.json({
        hotelScrapeInterval: hotelScrapeInterval,
        chainScrapeInterval: chainScrapeInterval,
        cityScrapeInterval: cityScrapeInterval
    });
})

app.get('/hotelids', (req, res) => {
    
    var hotelids = [5355,10268,5591,4536];

    res.setHeader('Content-Type', 'application/json');
    res.json({
        hotelids: hotelids,
    });
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})