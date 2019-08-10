/**
    Copyright 2019 Kevin Adams ©

    This file is a part of WanderJS

    WanderJS is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    WanderJS is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with WanderJS.  If not, see <https://www.gnu.org/licenses/>.
*/

const wt = require("wikitext-js");

const WikiObject = function (wikitext) {
    this.wikitext = wikitext;
    this.collection = wt.wikitextToCollection(wikitext);
};

WikiObject.prototype.getWikitext = function () {
    return this.wikitext;
};

WikiObject.prototype.getCollection = function () {
    return this.collection;
};


WikiObject.prototype.getInfobox = function () {
    let result;

    this.collection.map((obj) => {
        if (obj.template && obj.template.indexOf("Infobox") !== -1) {
            if (!result) {
                result = obj;
            } else {
                throw { error: "Multiple Infoboxes found" };
            }
        }
    })

    return result;
};

module.exports = WikiObject;
