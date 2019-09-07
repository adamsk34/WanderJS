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

const HatNote = require("../models/hatNote");
const wt = require("wikitext-js");

const WikiObject = function (wikitext) {
    this.wikitext = wikitext;
    this.collection = wt.wikitextToCollection(wikitext);
};

// TODO: move this to a utility file
/**
 * Finds all HatNote templates in a collection of templates
 * @param {Array} collection An array of template objects
 * @returns {Array} An array of HatNote templates
 */
const _getHatNoteTemplates = function (collection) {
    let result = [];

    collection.map((template) => {
        if (template.template === "for") {
            result.push(template);
        }
    });

    return result;
};

/**
 * Returns the raw Wikitext that is used to generate the article
 * @returns {String} Wikitext
 */
WikiObject.prototype.getWikitext = function () {
    return this.wikitext;
};

/**
 * Returns the collection object containing all of the article data as an array of objects.
 * @returns {Array} An array of objects containing all data in the article
 */
WikiObject.prototype.getCollection = function () {
    return this.collection;
};

/**
 * Returns an object that contains data from the article's Infobox
 * @returns {Object} An object containing the Infobox data
 */
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
    });

    return result;
};

/**
 * Returns an array of HatNote objects. HatNotes in Wikipedia articles
 * are notes about the article that come before the article itself
 * @returns {Array} An array of HatNote objects
 */
WikiObject.prototype.getHatNotes = function () {
    let result = [];
    const templates = _getHatNoteTemplates(this.collection);

    templates.map((template) => {
        result.push(new HatNote(template));
    });

    return result;
};

module.exports = WikiObject;
