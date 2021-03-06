var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3344);

app.get('/',function(req,res){
  var qParams = [];
  qParams.push({'name': ' ', 'value': ' '});
	
  for (var p in req.query){
    qParams.push({'name': p, 'value': req.query[p]});
  }
  var context = {};
  context.dataList = qParams;
  res.render('response', context);
});

app.post('/', function(req, res){
  var bParams = [];
  bParams.push({'name': ' ', 'value': ' '});

  for (var b in req.body) {
		bParams.push({'name': b, 'value': req.body[b]});
	}
	var context = {};

  context.bodyList = bParams;
	res.render('response', context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
