

var express = require("express");
var app = express();

app.use(express.static('public'));
var PORT = process.env.PORT || 5000;
app.set('port', PORT);

app.get('/',function(req,res,next){
    res.render('home');
});

/*Error Functions*/
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