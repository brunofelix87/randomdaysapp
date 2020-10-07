const express = require('express')
const random = require('random')
const schedule = require('node-schedule');
const app = express();
const port = 8080;
const HOST = '0.0.0.0';

let test = ''
var j = schedule.scheduleJob('1 0 * * *', function () {
    test = random.int(2, 5);    
    return test;
});

var process = require('process')
process.on('SIGINT', () => {
  console.info("Interrupted")
  process.exit(0)
})


app.get('/', (req, res) => {
    
    if (test === '') {
        test = random.int(2, 5);
    }

    res.setHeader('Content-Type', 'application/json');
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    //console.log(JSON.stringify(req.headers));
    res.json({
        randomNumber: test,
        Ip: ip
    });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})