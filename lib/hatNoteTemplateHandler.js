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

const hatNoteDefaults = ["For ", ", see ", " and ", "."];

/**
 * Returns an object that shows which parts of the sentance
 * making a hat note are links
 * @param {Object} hatNoteTemplate A template of a hat note
 * @returns {Array} An array of objects, representing a hat
 *                  note sentance,identifies the parts that
 *                  are links
 */
// TODO: test this
const getHatNoteVerboseArray = function (hatNoteTemplate) {
    let result = [{ "link": false, "content": hatNoteDefaults[0] }];
    let keyCount = 0;

    Object.keys(hatNoteTemplate.params).forEach((key) => {

        result.push({ "link": true, "content": key });
        keyCount++;

        if (result.length === 2) {
            result.push({ "link": false, "content": hatNoteDefaults[1] });
        } else if (keyCount < Object.keys(hatNoteTemplate.params).length) {
            result.push({ "link": false, "content": hatNoteDefaults[2] });
        } else {
            result.push({ "link": false, "content": hatNoteDefaults[3] });
        }
    });

    return result;
}

/**
 * Turns a template into human readable hatNote text
 * @param {Object} hatNoteTemplate A template of a hat note
 * @returns {String} The raw text content of a HatNote
 */
const getHatNoteText = function (hatNoteTemplate) {
    const hatNoteVerboseArr = getHatNoteVerboseArray(hatNoteTemplate);
    let result = "";

    hatNoteVerboseArr.forEach((fragment) => {
        result += fragment.content;
    });

    return result;
};

/**
 * Finds the start of a link in a hatnote
 * @param {Object} hatNoteTemplate A template of a hat note
 * @returns {String} The index of the first character of a hyperlink
 */
const getHatNoteLinkStart = function (hatNoteTemplate, linkText) {
    const hatNoteVerboseArr = getHatNoteVerboseArray(hatNoteTemplate);
    let result;
    let count = 0;

    // step through the object, counting characters until you find the link I'm looking for
    hatNoteVerboseArr.forEach((fragment) => {
        if (fragment.link && fragment.content === linkText) {
            // we found the link
            result = count;
        } else {
            // we didn't find the link
            count += fragment.content.length;
        }
    });

    if (!result) {
        throw { error: `Failed to find link with text ${linkText}` };
    }

    return result;
}

/**
 * Turns a template into an array of objects containing link data
 * @param {Object} hatNoteTemplate A template of a hat note
 * @returns {Array} An array of objects containing link data
 */
const getHatNoteLinks = function (hatNoteTemplate) {
    let result = [];
    let firstKey = true;

    Object.keys(hatNoteTemplate.params).forEach((key) => {
        if (!firstKey) {
            let link = {
                "url": "https://en.wikipedia.org/wiki/" + hatNoteTemplate.params[key],
                "start": getHatNoteLinkStart(hatNoteTemplate, key),
                "length": key.length,
            };

            result.push(link);
        } else {
            firstKey = false;
        }
    });

    return result;
};

module.exports = {
    getHatNoteText: getHatNoteText,
    getHatNoteLinks: getHatNoteLinks,
};