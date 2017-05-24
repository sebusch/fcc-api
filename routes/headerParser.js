var express = require( 'express' );
var router = express.Router();

// middleware that is specific to this router
// define the home page route


router.use( function( req, res, next ) {
  var headerData = {};
//  var ip = req.ip;
//  //handle ipv4 prefix:
//  if ( ip.substr( 0, 7 ) == '::ffff:' ) {
//    ip = ip.substr( 7 );
//  }
//  headerData.ipAddress = ip;
  headerData.ipAddress = req.get( 'X-Forwarded-For' ).split( ',' )[ 0 ] || req.ip;
  headerData.language = req.acceptsLanguages()[ 0 ];
  var userAgent = req.get( 'user-agent' );
  //contents of first parentheses:
  headerData.software = userAgent.split( '(' )[ 1 ].split( ')' )[ 0 ];
  res.send( JSON.stringify( headerData ) );
} );

module.exports = router;
