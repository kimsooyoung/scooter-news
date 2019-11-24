const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
var moment = require('moment');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Techcrunch = require('./data/Techcrunch.js');
const TheVerge = require('./data/TheVerge.js');
const BusinessInsider = require('./data/BusinessInsider.js');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute = 'mongodb+srv://read-write:rlatndud@mongo-personal-u4uyj.mongodb.net/article-scrap';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

const today = moment().format('YYYY-MM-DD');
const from = moment(today).subtract(9, 'hours');
const to = moment(today).add(15, 'hours');

// this is our get method
// this method fetches all available data in our database
router.get('/techcrunch', (req, res) => {
    TheVerge.find({ 'scrappedAt': { "$gte": from, "$lt": to } }, (err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

router.get('/theverge', (req, res) => {
    TheVerge.find({ 'scrappedAt': { "$gte": from, "$lt": to } }, (err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

router.get('/businessinsider', (req, res) => {
    BusinessInsider.find({ 'scrappedAt': { "$gte": from, "$lt": to } }, (err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

// append /api for our http requests
app.use('/scooter-news', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));