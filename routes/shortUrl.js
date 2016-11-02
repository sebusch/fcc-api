var express = require( 'express' );
var router = express.Router();
var Url = require( '../models/urls' );

var renderParams = require( '../models/text' ).shortUrl;
var timeout = require( 'connect-timeout' );

router.use( timeout( '5s' ) );
router.get( '/new/*', validateUrl, queryDB );
router.get( '/:shortcut', redirectDB );


router.get( '/', function( req, res ) {
  res.render( 'task', renderParams )
} )

router.use( function( err, req, res, next ) {
  if ( err.timeout ) {
    err.message = 'Sorry there is an error connecting to the database';
  }
  next( err );
} )

module.exports = router;

function redirectDB( req, res, next ) {
  Url.findShort( req.params.shortcut, function( err, doc ) {
    if ( err ) {
      next( err );
    }
    if ( doc ) {
      res.redirect( doc.original_url );
    } else {
      res.send( 'sorry, ' + req.params.shortcut + ' is not a valid bookmark.' );
    }
  } );
}


function queryDB( req, res, next ) {
  Url.findAndUpdate( req.params[ 0 ], function( err, doc ) {
    if ( err ) {
      next( err )
    }
    res.send( doc );
  } )
}

function validateUrl( req, res, next ) {
  if ( re_weburl.test( req.params[ 0 ] ) ) {
    next();
  } else {
    next( new Error( 'That is not a valid url. Remember to include http:// or https://' ) );
  }
}


// https://gist.github.com/dperini/729294
var re_weburl = new RegExp(
  '^' +
  // protocol identifier
  '(?:(?:https?|ftp)://)' +
  // user:pass authentication
  '(?:\\S+(?::\\S*)?@)?' +
  '(?:' +
  // IP address exclusion
  // private & local networks
  '(?!(?:10|127)(?:\\.\\d{1,3}){3})' +
  '(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})' +
  '(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})' +
  // IP address dotted notation octets
  // excludes loopback network 0.0.0.0
  // excludes reserved space >= 224.0.0.0
  // excludes network & broacast addresses
  // (first & last IP address of each class)
  '(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])' +
  '(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}' +
  '(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))' +
  '|' +
  // host name
  '(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)' +
  // domain name
  '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*' +
  // TLD identifier
  '(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))' +
  // TLD may end with dot
  '\\.?' +
  ')' +
  // port number
  '(?::\\d{2,5})?' +
  // resource path
  '(?:[/?#]\\S*)?' +
  '$', 'i'
);
