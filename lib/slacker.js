var request = require('request');

/**
 * Slack API wrapper
 * @param {object} config Slacker configuration
 * - token: Slack API token
 */
var Slacker = function (config) {
    this.token = config.token;
    this.organization = config.organization;
    return this;
};

/**
 * Send slack API request
 * @param  {string} method Slack API method
 * @param  {object} args POST arguments to send to Slack
 */
Slacker.prototype.send = function (method, args) {
    args = args || {} ;
    request.post({
        url: 'https://' + this.organization + '.slack.com/services/hooks/incoming-webhook?token=' + this.token,
        json: args
    }, function (error, response, body) {
        if (error) {
            console.log('Error:', error || body.error);
        }
    });
};

exports.Slacker = Slacker;
