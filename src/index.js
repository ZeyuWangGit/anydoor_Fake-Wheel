const http = require('http');
const path = require('path');
const conf = require('./config/defaultConfig');
const route = require('./helper/route');
const openURL = require('./helper/openURL');

class Server {
    constructor(config) {
        this.conf = Object.assign({}, conf, config);
    }
    start() {
        const server = http.createServer((req, res) => {
            const filePath = path.join(this.conf.root, req.url);
            route(req, res, filePath, this.conf);
        });

        server.listen(this.conf.port, this.conf.hostname, () => {
            const address = `http://${this.conf.hostname}:${this.conf.port}`;
            console.log(`Server started at ${address}`);
            openURL(address);
        });
    }
}
module.exports = Server;