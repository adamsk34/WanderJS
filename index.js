const async = require("async");
const jsonGrabber = require("./lib/jsonGrabber");

const articleTitle = "Stack Overflow";

async.waterfall([
    cb => {
        jsonGrabber.getArticle(articleTitle, cb);
    },
    (articleJson, cb) => {
        // TODO: add err to parameters
        console.log("articleJson =", articleJson);
    },
]);
