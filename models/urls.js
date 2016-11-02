var db = require( '../db' );

var collection = db.get( 'urls' )

var Url = function( data ) {
  this.data = data;
}

Url.prototype.data = {};

//find by short_url
Url.findShort = function( shortUrl, callback ) {
  collection
    .findOne( {
      short_url: shortUrl
    }, callback );
}

Url.findAndUpdate = function( longUrl, callback ) {
  collection.findOneAndUpdate(
    {
      original_url: longUrl
    },
    {
      $setOnInsert: {
        original_url: longUrl,
        short_url: getID()
      }
    },
    {
      projection: {
        _id: 0
      },
      new: true, // return new doc if one is upserted
      upsert: true // insert the document if it does not exist
    },
    callback
  )
}


module.exports = Url;

function getID() {
  var time = new Date();
  var offset = time.getTime() - 1470000000000;
  if ( offset < 0 ) {
    offset = -offset;
  }
  var result = convert( offset.toString(), BASE10, BASE56 );
  return result;
}
var BASE10 = '0123456789';
var BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
var BASE56 = '23456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';
function convert( src, srctable, desttable ) {
  var srclen = srctable.length;
  var destlen = desttable.length;
  var val = 0;
  var numlen = src.length;
  for ( var i = 0; i < numlen; i++ ) {
    val = val * srclen + srctable.indexOf( src.charAt( i ) );
  }
  if ( val < 0 ) {
    return 0;
  }
  var r = val % destlen;
  var res = desttable.charAt( r );
  var q = Math.floor( val / destlen );
  while ( q ) {
    r = q % destlen;
    q = Math.floor( q / destlen );
    res = desttable.charAt( r ) + res;
  }
  return res;
}
