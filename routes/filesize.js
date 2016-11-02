var express = require( 'express' );
var router = express.Router();
var renderParams = require( '../models/text' ).filesize;

var path = process.cwd();
var multer = require( 'multer' );
var autoReap = require( 'multer-autoreap' );
var upload = multer( {
  dest: path + '/tmp'
} );

// middleware that is specific to this router
// define the home page route

router.use( autoReap );
router.post( '/get-file-size', upload.single( 'sizeFile' ), function( req, res, next ) {
  if ( !req.file ) {
    next( new Error( 'Please select a file.' ) );
  }
  res.send( {
    size: req.file.size
  } )

} )


router.use( function( req, res ) {
  res.render( 'filesize', renderParams )
} )


module.exports = router;

