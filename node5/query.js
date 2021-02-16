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

   database.nosql(keys,function (d) { handleQuery1(req,res,d) } );
}



function handleQuery1(req,res,err,data)
{
   let rdata = { title: "CDQUERY Results",
		 count: data.rows.length,
		 disks : data.rows };

   res.render('results',rdata);
}



/********************************************************************************/
/*										*/
/*	Handle show single disk 						*/
/*										*/
/********************************************************************************/

function handleShow(req,res)
{
   let diskid = req.params.diskid;

   let q = "SELECT D.title,A.name as artist,D.length,D.genre,D.year " +
	   "FROM Disk D, Artist A " +
	   "WHERE D.id = $1 AND A.id = D.artistid";
   database.query(q,[diskid],function (e1,d1) { handleShow1(req,res,e1,d1); } );
}



function handleShow1(req,res,err,data)
{
   let rdata = { title: "Single Query Result",
		 disktitle: data.rows[0].title,
		 diskartist: data.rows[0].artist,
		 disklength: data.rows[0].length,
		 diskgenre: data.rows[0].genre,
		 diskyear: data.rows[0].year };

   let q = "SELECT T.name,A.name as artist,T.length,T.number " +
	   " FROM Track T,Artist A " +
	   " WHERE T.diskid = $1 AND T.artistid = A.id";

   database.query(q,[req.params.diskid],function(e1,d1) { handleShow2(req,res,rdata,e1,d1); });
}



function handleShow2(req,res,rdata,err,data)
{
   rdata.tracks = data.rows;

   res.render('single',rdata);
}




/********************************************************************************/
/*										*/
/*	Exports 								*/
/*										*/
/********************************************************************************/

exports.handleQuery = handleQuery;
exports.handleShow = handleShow;




/* end of query.js */
