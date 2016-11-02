
require( 'dotenv' ).config();

var express = require( 'express' );
var favicon = require( 'serve-favicon' );
var timestamp = require( './routes/timestamp' );
var headerParser = require( './routes/headerParser' );
var filesize = require( './routes/filesize' );
var shortUrl = require( './routes/shortUrl' );
var imgSearch = require( './routes/imgSearch' );

var app = express();
var PORT = process.env.PORT || 8080;

app.set( 'view engine', 'pug' );
app.use( favicon( './favicon.ico' ) );
app.use( express.static( __dirname + '/public' ) );

var pages = [ {
  'title': 'Timestamp Microservice',
  'link': '/timestamp'
}, {
  'title': 'Request Header Parser Microservice',
  'link': '/headerparser'
}, {
  'title': 'URL Shortener Microservice',
  'link': '/shorturl'
}, {
  'title': 'Image Search Abstraction Layer',
  'link': '/imgsearch'
}, {
  'title': 'File Metadata Microservice',
  'link': '/filesize'
}, ]

app.get( '/', function( req, res ) {
  res.render( 'index', {
    title: 'Backend Projects',
    pages: pages
  } )
} )

app.use( '/timestamp', timestamp );
app.use( '/headerparser', headerParser );
app.use( '/filesize', filesize );
app.use( '/shorturl', shortUrl );
app.use( '/imgsearch', imgSearch );


// app.use( function( req, res, next ) {
//   res.status( 404 ).send( {
//     error: 'Page does not exist'
//   } );
// } );

// app.use( function( err, req, res, next ) {
//   res.send( {
//     error: err.message
//   } );
//   next( err );
// } );

// catch 404 and forward to error handler
app.use( function( req, res, next ) {
  var err = new Error( 'Not Found' );
  err.status = 404;
  next( err );
} );

// error handlers

// development error handler
// will print stacktrace
if ( app.get( 'env' ) === 'development' ) {
  app.use( function( err, req, res, next ) {
    res.status( err.status || 500 );
    res.render( 'error', {
      title: 'Error',
      message: err.message,
      error: err
    } );
  } );
}

// production error handler
// no stacktraces leaked to user
app.use( function( err, req, res, next ) {
  res.status( err.status || 500 );
  res.render( 'error', {
    title: 'Error',
    message: err.status + ' ' + err.message,
    error: {}
  } );
} );





app.listen( PORT, function() {
  console.log( 'Example app listening on port %d!', PORT );
} );

