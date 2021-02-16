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

const PORT = 7774;



/********************************************************************************/
/*										*/
/*	Imports 								*/
/*										*/
/********************************************************************************/

const express = require('express');



/********************************************************************************/
/*										*/
/*	Setup routing using express						*/
/*										*/
/********************************************************************************/

function setup()
{
   let app = express();

   app.use('/html',express.static(__dirname + "/html"));
   app.get('/',function (req,res) { res.redirect("/html/index.html"); } );

   app.all('*',handle404);
   app.use(errorHandler);

   let server = app.listen(PORT);
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
   console.log("ERROR on request %d %s %s %s",process.domain.id,req.method,req.url,err);
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
