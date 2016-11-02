var db = require( '../db' );

var collection = db.get( 'imgs' )

var Img = function( data ) {
  this.data = data;
}

Img.prototype.data = {};

Img.save = function( term, callback ) {
  collection
    .insert( {
      term: term
    }, callback );
}

Img.findAll = function( callback ) {
  collection.find( {}, {
    sort: {
      $natural: -1
    }
  }, callback )
}


module.exports = Img;
