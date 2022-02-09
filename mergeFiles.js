const xmlparser = require('fast-xml-parser');
const fs = require("fs");
const LibraryParser = require("./LibraryParser");

const myArgs = process.argv.slice(2);
if (myArgs.length < 2) {
    console.log("Usage:");
    console.log("node mergeFiles.js $pageFilePath $libraryFilePath");
    process.exit();
}

const pageFilePath = myArgs[0];
const libraryFilePath = myArgs[1];

const pageFileParser = new LibraryParser(pageFilePath);
const libraryParser = new LibraryParser(libraryFilePath);

const nodesToCopy = pageFileParser.getAllNodes();
libraryParser.addNodes(nodesToCopy);
const newXml = libraryParser.getOutputXml();

const filename = "merged-library.xml";
fs.writeFileSync(filename, newXml);
console.log('Generated ' + filename);


// @see https://github.com/NaturalIntelligence/fast-xml-parser
