var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var compress = require('compression')

var app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	next()
})

app.use(compress())

app.use(express.static(path.resolve(__dirname, 'build')))

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

var port = 9091
app.listen(port, function() {
	console.log("Yearly running on port " + port)
})
