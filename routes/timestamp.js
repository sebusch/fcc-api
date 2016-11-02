var express = require( 'express' );
var router = express.Router();
var path = process.cwd();

var renderParams = require( '../models/text' ).timestamp;

router.get( '/', function( req, res ) {
  res.render( 'task', renderParams )
} )


router.get( '/:input', function( req, res ) {

  res.send( processInput( req.params.input ) );
} );

function processInput( input ) {
  var date = ( +input ) ? new Date( +input ) : new Date( input );
  var output = {
    unix: null,
    natural: null
  };
  if ( date.getDate() ) {
    output.unix = date.getTime();
    output.natural = dateParser( date );
  }
  return output;
}

function dateParser( date ) {
  var options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return date.toLocaleDateString( 'en-US', options );
}


module.exports = router;
