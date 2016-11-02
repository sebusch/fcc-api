var express = require( 'express' );
var router = express.Router();

var path = process.cwd();
var multer = require( 'multer' );
var autoReap = require( 'multer-autoreap' );
var upload = multer( {
  dest: path + '/tmp'
} );

// middleware that is specific to this router
// define the home page route

router.use(autoReap);
router.post( '/get-file-size', upload.single( 'sizeFile' ), function( req, res, next ) {
  if ( !req.file ) {
    next( new Error( 'Please select a file.' ) );
  }
  res.send( {
    size: req.file.size
  } )

} )

var stories = [
  'I can submit a FormData object that includes a file upload.',
  'When I submit something, I will receive the file size in bytes within the JSON response'
];


router.use( function( req, res ) {
  res.render( 'filesize', {
    title: 'File Metadata Microservice',
    userStories: stories,
    examples: []
  } )
} )


module.exports = router;

