/********************************************************************************/
/*										*/
/*		server.js							*/
/*										*/
/*	Demonstration Node.JS server using CdQuery database			*/
/*										*/
/********************************************************************************/



/********************************************************************************/
/*										*/
/*	Constants								*/
/*										*/
/********************************************************************************/

var PORT = 7777;



/********************************************************************************/
/*										*/
/*	Imports 								*/
/*										*/
/********************************************************************************/

var express = require('express');
var query = require('./query.js');

var bodyparser = require('body-parser');

var exphbs = require('express-handlebars');
var handlebars = exphbs.create( { defaultLayout: 'main' } )



/********************************************************************************/
/*										*/
/*	Setup routing using express						*/
/*										*/
/********************************************************************************/

function setup()
{
   var app = express();

   app.engine('handlebars',handlebars.engine);
   app.set('view engine','handlebars');

   app.use('/html',express.static(__dirname + "/html"));
   app.get('/',function (req,res) { res.redirect("/html/index.html"); } );

   app.use(bodyparser.urlencoded({ extended : false }));

   app.post('/query',query.handleQuery);
   app.get('/showdisk/:diskid',query.handleShow);

   app.all('*',handle404);
   app.use(errorHandler);

   var server = app.listen(PORT);
   console.log("Listening on port " + PORT);
}



/********************************************************************************/
/*										*/
/*	Error handling								*/
/*										*/
/********************************************************************************/

function handle404(req,res)
{
   res.redirect("/html/error.html");
}



function errorHandler(err,req,res,next)
{
   console.log("ERROR on request %s %s %s",req.method,req.url,err);
   console.log("STACK",err.stack);
   res.redirect("/html/error.html");
}




/********************************************************************************/
/*										*/
/*	Main program								*/
/*										*/
/********************************************************************************/

setup();



/* end of server.js */
