const yamljs = require('yamljs');
const openapidoc = yamljs.load('./docs/openapi/openapi.yaml');

module.exports=openapidoc;