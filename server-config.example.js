/**
 * Rename server-config.example.js to server-config.js when uploading to new server.
 * server-config.js is in .gitignore, and should be configured for particular server.
 */

var serverConfig = {
    /**
     * Set siteBaseUrl if site url on server is not '/'
     */
    siteBaseUrl: '',
    /**
     * Port to which node server will listen to
     */
    port: '9000'
};

if (typeof module !== 'undefined') {
    module.exports = serverConfig;
}
