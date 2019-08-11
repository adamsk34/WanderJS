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

const assert = require("assert");
const HatNote = require("../../models/hatNote");

describe("Integration", function () {
    describe("HatNote Tests", function () {

        it("Successfully creates HatNote object", function () {
            const template = {
                template: 'for',
                params:
                {
                    'the general term': true,
                    'Stack overflow': true,
                    'Stack overflow (disambiguation)': true
                }
            };

            const hatNoteObj = new HatNote(template);

            assert(hatNoteObj);

            assert(hatNoteObj.text);
            assert.strictEqual(hatNoteObj.text, "For the general term, see Stack overflow and Stack overflow (disambiguation).");
            assert(hatNoteObj.links);
            assert.strictEqual(hatNoteObj.links.length, 2);

            assert(hatNoteObj.links[0].url);

            assert.strictEqual(hatNoteObj.links[0].start, 26);
            assert(hatNoteObj.links[0].length);
            assert.strictEqual(hatNoteObj.links[0].length, 14);

            assert(hatNoteObj.links[1].url);

            assert.strictEqual(hatNoteObj.links[1].start, 45);
            assert(hatNoteObj.links[1].length);
            assert.strictEqual(hatNoteObj.links[1].length, 31);
        });
    });
});
