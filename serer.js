var express =require('express');
var app = express();
const path = require('path');
const PORT = process.env.PORT || 4020;

var app_path = '../desapp-grupoo-frontend'

app.use('/', express.static(path.join(__dirname, app_path )))
	.listen(PORT, () =>	console.log(`Listening on port ${PORT}`))
	.get('/*', function(req,res){
		res.sendFile(path.join(__dirname + '/src/index.html'))
	})