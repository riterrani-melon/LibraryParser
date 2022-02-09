const xmlparser = require("fast-xml-parser");
const fs = require("fs");

class LibraryParser {
    constructor(filePath) {
        const options = {
            ignoreAttributes: false,
            allowBooleanAttributes: true,
            processEntities: false
        };
        this.parser = new xmlparser.XMLParser(options);
        const builderOptions = {
            ignoreAttributes : false,
            format: true,
            processEntities: false
        };

        this.builder = new xmlparser.XMLBuilder(builderOptions);

        let xml = fs.readFileSync(filePath);
        this.xmlData = this.parser.parse(xml);
        this.outputXml = { ...this.xmlData };
    }

    getPageNode (pageId) {
        return this.getNode(pageId)
    }

    getNode (contentId) {
        return this.xmlData.library.content.find(content => content['@_content-id'] === contentId);
    }

    removeNode (contentId) {
        const index = this.outputXml.library.content.findIndex(content => content['@_content-id'] === contentId);
        if (index > -1) {
            this.outputXml.library.content.splice(index, 1);
        }
    }

    getPageNodes(pageId) {
        const pageNode = this.getPageNode(pageId);
        const relatedNodes = this.getContentLinksNodes(pageNode);

        return [pageNode, ...relatedNodes];
    }

    getContentLinksNodes(node) {
        let nodes = [];
        let contentLinks = node['content-links'] && node['content-links']['content-link'] ? node['content-links']['content-link'] : [];
        if (contentLinks.length) {
            for (const contentLink of contentLinks) {
                const contentId = contentLink['@_content-id'];
                const contentNode = this.getNode(contentId);
                nodes.push(contentNode);
                nodes = nodes.concat(this.getContentLinksNodes(contentNode));
            }
        }

        return nodes;
    }

    getXmlWithNodes(nodes) {
        var newData = { ...this.xmlData };
        newData.library = {content: nodes};

        return this.builder.build(newData);
    }

    getXmlWithoutPage(pageId) {
        const pageNodes = this.getPageNodes(pageId);
        for (const pageNode of pageNodes) {
            this.removeNode(pageNode['@_content-id']);
        }

        return this.getOutputXml();
    }

    getAllNodes() {
        return this.xmlData.library.content;
    }

    addNodes(nodes) {
        this.xmlData.library.content = this.xmlData.library.content.concat(nodes);
    }

    getOutputXml() {
        return this.builder.build(this.outputXml);
    }
}

module.exports = LibraryParser;
