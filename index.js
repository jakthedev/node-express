const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const promotionRouter = require('./routes/promotionRouter');
const leaderRouter = require('./routes/leaderRouter');
const dishRouter = require('./routes/dishRouter');
const hostname = 'localhost';
const port = 3002;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/dishes', dishRouter);
app.use('/leaders', leaderRouter);
app.use('/promotions', promotionRouter);
app.use(express.static(__dirname+ '/public'));

app.use((req, res, next) => {
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html' );
    res.end('<html><body><h1>This is an Express Server</h1></body></html>')
});

app.all('/dishes', (req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
});

app.all('/promotions', (req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
});

app.all('/leaders', (req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
});

app.delete('/dishes', (req,res, next) => {
    res.end('Deleting all the dishes!');
});

app.delete('/promotions', (req,res, next) => {
    res.end('Deleting all the dishes!');
});

app.delete('/leaders', (req,res, next) => {
    res.end('Deleting all the dishes!');
});

app.get('/dishes/:dishId', (req,res, next) => {
    res.end('Will send details of dish: '
        + req.params.dishId + ' to you!');
});

app.post('/dishes/:dishId', (req,res,next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'
    + req.params.dishId);
});

app.put('/dishes/:dishId', (req,res,next) => {
    res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('Will update the dish: ' + req.body.name +
     ' with details: ' + req.body.description)
});

app.delete('/dishes/:dishId', (req,res, next) => {
    res.end('Deleting dish: ' + req.params.dishId);
});

app.get('/promotions/:promotionId', (req,res, next) => {
    res.end('Will send details of dish: '
        + req.params.promotionId + ' to you!');
});

app.post('/promotions/:promotionId', (req,res,next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'
        + req.params.promotionId);
});

app.put('/promotions/:promotionId', (req,res,next) => {
    res.write('Updating the dish: ' + req.params.promotionId + '\n');
    res.end('Will update the dish: ' + req.body.name +
        ' with details: ' + req.body.description)
});

app.get('/leaders/:leaderId', (req,res, next) => {
    res.end('Will send details of dish: '
        + req.params.leaderId + ' to you!');
});

app.post('/leaders/:leaderId', (req,res,next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'
        + req.params.promotionId);
});

app.put('/leaders/:leaderId', (req,res,next) => {
    res.write('Updating the dish: ' + req.params.leaderId + '\n');
    res.end('Will update the dish: ' + req.body.name +
        ' with details: ' + req.body.description)
});


app.delete('/dishes/:dishId', (req,res, next) => {
    res.end('Deleting dish: ' + req.params.dishId);
});


const server = http.createServer(app);

server.listen(port, hostname, () => {
   console.log(`Server running at http://${hostname}:${port}`)
});