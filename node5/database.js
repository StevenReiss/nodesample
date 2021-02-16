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

const DB_URL = 'mongodb://bdognom-v2.cs.brown.edu';
const DB_NAME = 'cdquery';



/********************************************************************************/
/*										*/
/*	Imports 								*/
/*										*/
/********************************************************************************/

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


/********************************************************************************/
/*										*/
/*	Initializations 							*/
/*										*/
/********************************************************************************/

// const client = new MongoClient(DB_URL,{ useUnifiedTopology: true,
//					     auth : { user : 'cs132', password: 'csci1320' },
// });
const client = new MongoClient(DB_URL,{ useUnifiedTopology: true });

let db = null;
client.connect(function(err) {
		  assert.equal(null,err);
		  console.log("Connected successfully to server");
		  db = client.db(DB_NAME);
		  nosql("both sides now");
		} );



/********************************************************************************/
/*										*/
/*	Query function								*/
/*										*/
/********************************************************************************/

function nosql(wds,next)
{
   const collection = db.collection('cds');
   let x = collection.find( { $text : { $search: wds } } );
   console.log("DATABASE: ",x);
}




/********************************************************************************/
/*										*/
/*	Exports 								*/
/*										*/
/********************************************************************************/



exports.nosql = nosql;




/* end of database.js */

