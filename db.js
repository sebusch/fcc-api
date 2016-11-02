var monk = require( 'monk' );
var mongoURI = process.env.MONGOLAB_URI;
const db = monk( mongoURI );

module.exports = db;
