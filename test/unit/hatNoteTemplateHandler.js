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

// TODO: write tests for beyond the "happy path"

describe("Unit", function () {
    describe("templateHandler Tests", function () {

        it("Successfully pulls text from \"for\" template", function () {
            const template = {
                template: "for",
                params:
                {
                    "the general term": true,
                    "Stack overflow": true,
                    "Stack overflow (disambiguation)": true
                }
            };

            const text = templateHandler.getHatNoteText(template);

            assert(text);
            assert.strictEqual(text, "For the general term, see Stack overflow and Stack overflow (disambiguation).");
        });

        it("Successfully pulls links from \"for\" template", function () {
            const template = {
                template: "for",
                params:
                {
                    "the general term": true,
                    "Stack overflow": true,
                    "Stack overflow (disambiguation)": true
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

        it("Successfully generates verbose information about hat note", function () {
            const template = {
                template: "for",
                params:
                {
                    "the general term": true,
                    "Stack overflow": true,
                    "Stack overflow (disambiguation)": true
                }
            };

            const hatNoteVerboseArr = templateHandler.getHatNoteVerboseArray(template);

            assert(hatNoteVerboseArr);
            assert.strictEqual(hatNoteVerboseArr.length, 7);

            assert(!hatNoteVerboseArr[0].link);// link === false
            assert.strictEqual(hatNoteVerboseArr[0].content, "For ");

            assert(hatNoteVerboseArr[1].link);// link === true
            assert.strictEqual(hatNoteVerboseArr[1].content, "the general term");

            assert(!hatNoteVerboseArr[2].link);// link === false
            assert.strictEqual(hatNoteVerboseArr[2].content, ", see ");

            assert(hatNoteVerboseArr[3].link);// link === true
            assert.strictEqual(hatNoteVerboseArr[3].content, "Stack overflow");

            assert(!hatNoteVerboseArr[4].link);// link === false
            assert.strictEqual(hatNoteVerboseArr[4].content, " and ");

            assert(hatNoteVerboseArr[5].link);// link === true
            assert.strictEqual(hatNoteVerboseArr[5].content, "Stack overflow (disambiguation)");

            assert(!hatNoteVerboseArr[6].link);// link === false
            assert.strictEqual(hatNoteVerboseArr[6].content, ".");
        });

        it("Successfully finds the start of the link \"Stack overflow\"", function () {
            const template = {
                template: "for",
                params:
                {
                    "the general term": true,
                    "Stack overflow": true,
                    "Stack overflow (disambiguation)": true
                }
            };

            const start = templateHandler.getHatNoteLinkStart(template, "Stack overflow");

            assert.strictEqual(start, 26);
        });

        it("Successfully finds the start of the link \"Stack overflow (disambiguation)\"", function () {
            const template = {
                template: "for",
                params:
                {
                    "the general term": true,
                    "Stack overflow": true,
                    "Stack overflow (disambiguation)": true
                }
            };

            const start = templateHandler.getHatNoteLinkStart(template, "Stack overflow (disambiguation)");

            assert.strictEqual(start, 45);
        });
    });
});
