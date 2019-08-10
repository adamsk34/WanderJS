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

/**
 * Turns a template into human readable hatNote text
 * @returns {String} The raw text content of a HatNote
 */
const getHatNoteText = function (hatNoteTemplate) {
    let result;
    let numKeys = Object.keys(hatNoteTemplate.params).length;
    let keysLeft = numKeys;

    Object.keys(hatNoteTemplate.params).forEach((key) => {
        keysLeft--;
        if (hatNoteTemplate.params[key]) {
            if (!result) {
                result = "For " + key + ", see ";
            } else {
                result += key;
                if (keysLeft === 0) {
                    result += ".";
                } else {
                    result += " and ";
                }
            }
        }
    });

    return result;
};

/**
 * Turns a template into an array of objects containing link data
 * @returns {Array} An array of objects containing link data
 */
const getHatNoteLinks = function (hatNoteTemplate) {
    let result = [];

    return result;
};

module.exports = {
    getHatNoteText: getHatNoteText,
    getHatNoteLinks: getHatNoteLinks,
};