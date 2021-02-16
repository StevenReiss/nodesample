/********************************************************************************/
/*										*/
/*		query.js							*/
/*										*/
/*	Code to handle queries for cd database					*/
/*										*/
/********************************************************************************/


/********************************************************************************/
/*										*/
/*	Imports 								*/
/*										*/
/********************************************************************************/

const database = require("./database.js");



/********************************************************************************/
/*										*/
/*	Query handler								*/
/*										*/
/********************************************************************************/

function handleQuery(req,res)
{
   let prms = req.body;

   let keys = prms.searchterms.toLowerCase();
   let keyarr = keys.split(/[ \t,;]+/);

   console.log("QUERY: ",keyarr,keyarr.length);

   let q = "SELECT D.title,A.name AS artist,D.length,D.genre,D.year,D.id " +
       "FROM Disk D,Artist A";
   for (let i = 0; i < keyarr.length; ++i) {
      let j = i+1;
      q += " , Words W" + j;
    }
   q += " WHERE D.artistid = A.id ";
   for (i = 0; i < keyarr.length; ++i) {
      let j1 = i+1;
      q += " AND W" + j1 + ".word = $" + j1 + " AND W" + j1 + ".id = D.id";
    }

   console.log("QUERY",q);

   database.query(q,keyarr,function (e1,d1) { handleQuery1(req,res,e1,d1); });
}



function handleQuery1(req,res,err,data)
{
   console.log("QUERY1",err,data);

   let rdata = { title: "CDQUERY Results",
		 count: data.rows.length,
		 disks : data.rows };

   res.render('results',rdata);
}




/********************************************************************************/
/*										*/
/*	Exports 								*/
/*										*/
/********************************************************************************/

exports.handleQuery = handleQuery;



/* end of query.js */
