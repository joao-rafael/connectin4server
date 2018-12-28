/*
* Settings module
*/
//root directory
module.exports.documentRoot = '';
//defaultIndexHtml file
module.exports.defaultIndex = 'index.html';
//Server application Port
module.exports.port = 8144;
// Supported media types
module.exports.mediaTypes = {
    'txt':      'text/plain',
    'html':     'text/html',
    'css':      'text/css',
    'js':       'application/javascript',
    'png':      'image/png',
    'jpeg':     'image/jpeg',
    'jpg':      'image/jpeg',
}
//module.exports
/**
 Information logs
*/
console.log("opened module?");
console.log(module.filename);
console.log(module.id);
console.log(module.exports);
//test;
