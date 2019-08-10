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
    "../wikitext/Stack_OverFlow.txt"
);
const stackOverflowWT = fs.readFileSync(stackOverflowWTPath).toString();

describe("Unit", function () {
    describe("wikiObject Tests", function () {

        it("Successfully generates wikitext", function () {
            const wObj = new WikiObject(stackOverflowWT);
            const wikitext = wObj.getWikitext();

            assert(wikitext);
            assert.strictEqual(typeof wikitext, "string");
        });

        it("Successfully generates collection", function () {
            const wObj = new WikiObject(stackOverflowWT);
            const collection = wObj.getCollection();

            assert(collection);
            assert.strictEqual(typeof collection, "object");
            assert(collection[0]);
            assert(collection[0].template);
            assert(collection[0].params);
        });

        it("Successfully generates Infobox", function () {
            const wObj = new WikiObject(stackOverflowWT);
            const infoBox = wObj.getInfobox();

            assert(infoBox);
            assert.strictEqual(typeof infoBox, "object");
            assert(infoBox.params);
            assert.strictEqual(infoBox.params.name, "Stack Overflow");
        });
    });
});
