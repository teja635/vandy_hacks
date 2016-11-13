var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var morgan = require('morgan');
var db = require('./models/db.js');

if(GLOBAL.SQLpool === undefined){
	GLOBAL.SQLpool = db.createPool(); //create a global sql pool connection
}

morgan.token('res', function getId(res) {
	return res;
});

var accessLogStream = fs.createWriteStream(__dirname + '/logs/access.log', {flags: 'a'});
// setup the logger
app.use(morgan(':req[body] :res[body]', {stream: accessLogStream}));

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.static('heat_maps'));
app.use(express.static('static'));
app.use('/heat_maps', express.static('public'));
app.use('/static', express.static('public'));
app.use('/', express.static(__dirname + '/www')); // redirect root
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.use(require('./controllers'));

app.get('/',function(req,res){
	res.sendFile(__dirname + "/index.html");
});

app.listen('3000', function(){

});
