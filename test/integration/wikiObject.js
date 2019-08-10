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
const fs = require("fs");
const path = require("path");
const WikiObject = require("../../lib/wikiObject");

const stackOverflowWTPath = path.join(
    __dirname,
    "../wikitext/2019-08-03/Stack_Overflow.txt"
);
const stackOverflowWT = fs.readFileSync(stackOverflowWTPath).toString();

describe("Integration", function () {
    describe("WikiObject Tests", function () {

        it("Successfully generates wikitext", function () {
            const wObj = new WikiObject(stackOverflowWT);
            const wikitext = wObj.getWikitext();

            assert(wikitext);
        });

        it("Successfully generates collection from wikitext", function () {
            const wObj = new WikiObject(stackOverflowWT);
            const collection = wObj.getCollection();

            assert(collection);
            assert(collection[0]);
            assert(collection[0].template);
            assert(collection[0].params);
        });

        it("Successfully generates Infobox from wikitext", function () {
            const wObj = new WikiObject(stackOverflowWT);
            const infoBox = wObj.getInfobox();

            assert(infoBox);
            assert(infoBox.params);
            assert.strictEqual(infoBox.params.name, "Stack Overflow");
        });

        it("Successfully generates HatNotes from wikitext", function () {
            const wObj = new WikiObject(stackOverflowWT);
            const hatNotes = wObj.getHatNotes();

            assert(hatNotes);

            // TODO: This test has deep knowledge of Stack_Overflow.txt, ideally the code would have the info passed to it

            assert.strictEqual(hatNotes.length, 2);

            assert(hatNotes[0].text);
            assert.strictEqual(hatNotes[0].text, "For the general term, see Stack overflow and Stack overflow (disambiguation).");
            assert(hatNotes[0].links);
            assert.strictEqual(hatNotes[0].links.length, 2);
            assert(hatNotes[0].links[0].url);
            assert(hatNotes[0].links[0].start);
            assert.strictEqual(hatNotes[0].links[0].start, 26);
            assert(hatNotes[0].links[0].length);
            assert.strictEqual(hatNotes[0].links[0].length, 13);
            assert.strictEqual(hatNotes[0].links[1].start, 45);
            assert(hatNotes[0].links[1].length);
            assert.strictEqual(hatNotes[0].links[1].length, 31);

            assert(hatNotes[1].text);
            assert.strictEqual(hatNotes[1].text, "For the parent company, see Stack Exchange.");
            assert(hatNotes[1].links);
            assert.strictEqual(hatNotes[1].links.length, 1);
            assert(hatNotes[1].links[0].url);
            assert(hatNotes[1].links[0].start);
            assert.strictEqual(hatNotes[1].links[0].start, 26);
            assert(hatNotes[1].links[0].length);
            assert.strictEqual(hatNotes[1].links[0].length, 13);
            assert.strictEqual(hatNotes[1].links[1].start, 45);
        });
    });
});
