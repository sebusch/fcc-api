var express = require( 'express' );
var monk = require( 'monk' );
var mongoURI = process.env.MONGOLAB_URI;
var apiKey = process.env.GOOG_API_KEY;
var cseID = '009023594552369937811:myxjg6juwm0';
const https = require( 'https' ),
  qs = require( 'querystring' ),
  bl = require( 'bl' );
var path = process.cwd();

var renderParams = require( '../models/text' ).imgSearch;

var router = express.Router();

const db = monk( mongoURI );

db.catch( ( err ) => {
  // error connecting to the database
  router.use( function( err, req, res, next ) {
    console.error( err.stack );
    res.status( 500 ).send( 'Sorry there is an error connecting to the database' );
  } );
} );

const collection = db.get( 'imgs' )

router.get( '/search', function( req, res ) {
  res.redirect( '/' );
} );

router.get( '/search/:term', validateQuery, search, saveDB );

router.get( '/latest', getDB );

router.get( '/', function( req, res ) {
  res.render( 'task', renderParams );
} )

// catch 404 and forward to error handler
router.use( function( req, res, next ) {
  var err = new Error( 'Not Found' );
  err.status = 404;
  next( err );
} );

module.exports = router;

function validateQuery( req, res, next ) {
  // if offset query exists, makes sure it can be cast as integer. 
  // if it can't, next (err)
  if ( req.params.term.length == 0 ) {
    next( new Error( 'please enter a search term. usage: searchTerms?offset=3' ) );
  }
  var keys = Object.keys( req.query );
  if ( keys.length > 1 ) {
    next( new Error( 'too many query parameters. usage: searchTerms?offset=3' ) );
  }
  if ( keys.length == 1 ) {
    if ( keys[ 0 ] != 'offset' ) {
      next( new Error( "Please ensure the query parameter is 'offset'. usage: searchTerms?offset=3" ) );
    }
    if ( !parseInt( req.query.offset ) ) {
      next( new Error( "Please ensure the 'offset' parameter is an integer. usage: searchTerms?offset=3" ) );
    }
  }
  next();

}

function search( req, res, next ) {
  var query = {
    q: req.params.term,
    cx: cseID,
    key: apiKey,
    num: '10',
    searchType: 'image',
    fields: 'items(image(contextLink,thumbnailLink),link,snippet)'
  };
  if ( req.query.offset ) {
    query.start = 10 * parseInt( req.query.offset, 10 ) + 1;
  }
  var url = 'https://www.googleapis.com/customsearch/v1?' + qs.stringify( query );
  https.get( url, function( response ) {

    response.pipe( bl( function( err, data ) {
      if ( err ) {
        console.error( err.message );
        next( err );
      }
      var dataString = data.toString();
      var dataJSON = JSON.parse( dataString ).items;
      var arr = []
      for ( var i = 0; i < dataJSON.length; i++ ) {
        var item = dataJSON[ i ];
        arr.push( {
          'url': item.link,
          'snippet': item.snippet,
          'thumbnail': item.image.thumbnailLink,
          'context': item.image.contextLink
        } );
      }

      res.send( arr );
      next();
    } ) );
  } ).on( 'error', function( err ) {
    console.error( err );
    next( err );
  } );
}

function saveDB( req, res, next ) {
  collection.insert( {
    term: req.params.term
  } ).catch( ( err ) => {
    // An error happened while inserting
    next( new Error( 'error inserting into database' ) );
  } )
}

function getDB( req, res, next ) {
  collection.find( {}, {
    sort: {
      $natural: -1
    }
  } ).then( ( docs ) => {
    var output = [];
    for ( var i = 0; i < docs.length; i++ ) {
      output.push( {
        term: docs[ i ].term,
        timestamp: docs[ i ]._id.getTimestamp()
      } );
    }
    res.send( output );
  } ).catch( ( err ) => {
    console.log( err );
    next( err );
  } );
}
