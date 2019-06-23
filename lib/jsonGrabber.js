/**
    Copyright 2019 Kevin Adams ©

    This file is a part of this program

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

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
