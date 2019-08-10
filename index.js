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

const async = require("async");
const jsonGrabber = require("./lib/jsonGrabber");
const WikiObject = require("./lib/wikiObject");

const articleTitle = "Stack Overflow";

async.waterfall([
    cb => {
        jsonGrabber.getArticle(articleTitle, cb);
    },
    (articleJson, cb) => {
        let pageKeys = Object.keys(articleJson.query.pages);
        let contentWT = articleJson.query.pages[pageKeys].revisions[0]["*"];

        cb(null, contentWT);
    },
    (contentWT, cb) => {
        const wikiObj = new WikiObject(contentWT);

        console.log("wikiObj =", wikiObj.getCollection());
    },
    // (contentWT, cb) => {
    //     const col = wt.wikitextToCollection(contentWT);

    //     col.map(function(item) {
    //         if (typeof item === "string") {
    //             console.log("item =", '"' + item + '"');
    //         } else {
    //             console.log("item =", item);
    //         }
    //         console.log("\n\n");
    //     });

    //     cb(null);
    // },
]);
