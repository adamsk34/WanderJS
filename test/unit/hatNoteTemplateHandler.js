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
const templateHandler = require("../../lib/hatNoteTemplateHandler");

describe("Unit", function () {
    describe("templateHandler Tests", function () {

        it("Successfully pulls text from \"for\" template", function () {
            const template = {
                template: 'for',
                params:
                {
                    'the general term': true,
                    'Stack overflow': true,
                    'Stack overflow (disambiguation)': true
                }
            };

            const text = templateHandler.getHatNoteText(template);

            assert(text);
            assert.strictEqual(text, "For the general term, see Stack overflow and Stack overflow (disambiguation).");
        });

        it("Successfully pulls links from \"for\" template", function () {
            const template = {
                template: 'for',
                params:
                {
                    'the general term': true,
                    'Stack overflow': true,
                    'Stack overflow (disambiguation)': true
                }
            };

            const links = templateHandler.getHatNoteLinks(template);

            assert(links);
            assert.strictEqual(links.length, 2);

            assert(links[0].url);

            assert.strictEqual(links[0].start, 26);
            assert(links[0].length);
            assert.strictEqual(links[0].length, 14);

            assert(links[1].url);

            assert.strictEqual(links[1].start, 45);
            assert(links[1].length);
            assert.strictEqual(links[1].length, 31);
        });
    });
});
