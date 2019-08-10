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

describe("Unit", function() {
    describe("wikiObject Tests", function() {
        it("Successfully Finds Infobox", function() {
            let wObj = new WikiObject(stackOverflowWT);

            assert(wObj.getInfobox());
        });
    });
});
