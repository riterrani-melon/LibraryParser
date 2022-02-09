const xmlparser = require('fast-xml-parser');
const fs = require("fs");
const LibraryParser = require("./LibraryParser");

const myArgs = process.argv.slice(2);
if (myArgs.length < 2) {
    console.log("Usage:");
    console.log("node removePage.js $filePath $pageId");
    process.exit();
}

const filePath = myArgs[0];
const pageId = myArgs[1];

const libraryParser = new LibraryParser(filePath);

const newXml = libraryParser.getXmlWithoutPage(pageId);

fs.writeFileSync("library-without-" + pageId + ".xml", newXml);


// @see https://github.com/NaturalIntelligence/fast-xml-parser
