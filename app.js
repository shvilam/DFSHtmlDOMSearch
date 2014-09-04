/**
 * Created by amit on 8/30/14.
 */
/**
 * Created by Amit Shvil on 6/5/14.
 */

var express = require('express');
var compression = require('compression');


var app = express();
app.use(compression());


// New call to compress content
//app.use(express.compress());
var oneDay = 86400000*30;
app.use(express.static(__dirname + '/source', { maxAge: oneDay }));

app.listen(process.env.PORT || 5000);



