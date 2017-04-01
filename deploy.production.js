var fs = require( 'vinyl-fs' );
var ftp = require( 'vinyl-ftp' );

var config = {
  host:     'ftp.corinthians.vintagenc.com',
  user:     process.env.FTP_USERNAME,
  password: process.env.FTP_PASSWORD,
  parallel: 10
}

var conn = new ftp(config);

fs.src( [ './build/**' ], { buffer: false } )
	.pipe( conn.dest( '/corinthians.vintagenc.com' ) );
