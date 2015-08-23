/**
 * Rename server-config.example.js to server-config.js when uploading to new server.
 * server-config.js is in .gitignore, and should be configured for particular server.
 */

var serverConfig = {
    /**
     * Set siteBaseUrl to '/my-sub-site', if you're setting up site on shared domain
     * Leave it as emtpy string '', if site has own domain
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
