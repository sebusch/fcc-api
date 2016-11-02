
require( 'dotenv' ).config();

var express = require( 'express' );
var favicon = require( 'serve-favicon' );
var timestamp = require( './routes/timestamp' );
var headerParser = require( './routes/headerParser' );
var filesize = require( './routes/filesize' );
var shortUrl = require( './routes/shortUrl' );
var imgSearch = require( './routes/imgSearch' );
var text = require( './models/text' );

var app = express();
var PORT = process.env.PORT || 8080;

app.set( 'view engine', 'pug' );
app.use( favicon( './favicon.ico' ) );
app.use( express.static( __dirname + '/public' ) );

app.get( '/', function( req, res ) {
  res.render( 'index', {
    title: 'Backend Projects',
    pages: text
  } )
} )

app.use( text.timestamp.link, timestamp );
app.use( text.headerParser.link, headerParser );
app.use( text.filesize.link, filesize );
app.use( text.shortUrl.link, shortUrl );
app.use( text.imgSearch.link, imgSearch );


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

