/********************************************************************************/
/*										*/
/*		database.js							*/
/*										*/
/*	Database query methods							*/
/*										*/
/********************************************************************************/



/********************************************************************************/
/*										*/
/*	Constants								*/
/*										*/
/********************************************************************************/

const DB_CONNECT = 'postgres://XXXXXX@db.cs.brown.edu/cdquery';
const PWD_FILE = '/.samplepass';

function dbConnect()
{
   let pwd = fs.readFileSync(__dirname + PWD_FILE);
   pwd = pwd.toString().trim();
   let conn = DB_CONNECT.replace("XXXXXX",pwd);
   
   return conn;
}


/********************************************************************************/
/*										*/
/*	Imports 								*/
/*										*/
/********************************************************************************/

const adb = require('any-db');



/********************************************************************************/
/*										*/
/*	Initializations 							*/
/*										*/
/********************************************************************************/

const pool = adb.createPool(dbConnect(),{ min : 1, max : 4 });




/********************************************************************************/
/*										*/
/*	Query function								*/
/*										*/
/********************************************************************************/

function query(q,prms,next)
{
   if (prms instanceof Function) {
      next = prms;
      prms = undefined;
    }

   console.log("DATABASE:",q,prms);

   q = fixQuery(q);

   return pool.query(q,prms,callback(next));
}



function callback(next)
{
   return function(err,data) {
      console.log("DATABASE RESULT",err,data);
      if (next != null) next(err,data);
    }
}




/********************************************************************************/
/*										*/
/*	Handle mysql - postgresql differences on parameters			*/
/*										*/
/********************************************************************************/

function fixQuery(q)
{
   if (dbConnect().substring(0,5) == "mysql") {
      q = q.replace(/\$\d+/g,"?");
    }

   return q;
}



/********************************************************************************/
/*										*/
/*	Exports 								*/
/*										*/
/********************************************************************************/

exports.query = query;




/* end of database.js */
