const request = require("request");
const urlNoTitle = require("../constants/wikipedia").apiUrlNoTitle;

/**
 * Returns JSON object of Wikipedia Article
 * @param {string} origTitle
 * @param {Function} cb
 */
const getArticle = function(origTitle, cb) {
    if (!origTitle) {
        return cb({ error: "missing_title" }); // TODO: proper error handling for nodejs
    }
    const title = origTitle.replace(/ /g, "_");
    const url = urlNoTitle + title;

    request(
        {
            url: url,
            json: true,
        },
        function(err, response, body) {
            if (err) {
                return cb(err);
            }
            if (response.statusCode === 200) {
                return cb(null, body);
            }
        }
    );
};

module.exports = { getArticle: getArticle };
