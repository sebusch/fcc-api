var express = require( 'express' );
var router = express.Router();
var path = process.cwd();
// middleware that is specific to this router
// define the home page route
// router.get( '/', function( req, res ) {
//   res.sendFile( path + '/public/timestamp.html' );
// } );

var stories = [
  'I can pass a string as a parameter, and it will check to see whether that string contains either a unix timestamp or a natural language date (example: January 1, 2016)',
  'If it does, it returns both the Unix timestamp and the natural language form of that date.',
  'If it does not contain a date or Unix timestamp, it returns null for those properties.'
];
var examples = [ {
  'heading': 'Example usage:',
  'content': [
    'http://sebusch-timestamp-api.herokuapp.com/December%2015,%202015',
    'http://sebusch-timestamp-api.herokuapp.com/December 15, 2015',
    'http://sebusch-timestamp-api.herokuapp.com/1450137600'
  ]
}, {
  'heading': 'Example output:',
  'content': [ '{ "unix": 1450137600, "natural": "December 15, 2015" }' ]
} ]

router.get( '/', function( req, res ) {
  res.render( 'task', {
    title: 'Timestamp Microservice',
    userStories: stories,
    examples: examples
  } )
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
