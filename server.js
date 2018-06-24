var express = require('express');

var app = express();
app.use(express.static(__dirname + '/public'));
//app.use(express.static('public'));

app.set('port', process.env.PORT || 5000);

app.get('/', function(req, res){
	res.redirect('/home.html');
});

app.use(function(req, res){
	res.status(404);
	res.redirect('/404.html');
});

app.use(function(err, req, res, next){
	res.status(500);
	res.redirect('/500.html');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
