const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer(function(request, response) {
	
	const urlPath = url.parse(request.url).pathname;
	var filePath = `./client/${urlPath}`;

	fs.stat(filePath, (err, fileInfo) => {
		if (!err && fileInfo.isDirectory()) {
			filePath += '/index.html';		
		}
	
		fs.exists(filePath, doesExist => {
			if (!doesExist) {
				response.statusCode = 404;
				response.end(`Resource not found: '${urlPath}'`)
			} 	else {
				fs.readFile(filePath, (err, data) => {
					if (err) {
						response.statusCode = 500;
						response.end(`Server error: '${err}'`);
					} else {
						response.end(data.toString('utf-8'));
					}
				});
			}
		});
	});

});


server.listen(4000, function() {
	console.log(`Server Listening...`)
})