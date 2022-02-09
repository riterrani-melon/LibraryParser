## Instructions
### Extract page from library xml
Extract Page Designer page from library xml and generate new file with content
#### Command
node extractPage.js $filePath $pageId
#### Output
$pageId.xml

### Remove page from library xml
Remove Page Designer page from library xml and generate new file with content
#### Command
node removePage.js $filePath $pageId
#### Output
library-without-$pageId.xml

### Merge page xml with library xml
Merge Page Designer page into a library xml and generate new file with content
#### Command
node mergeFiles.js $pageFilePath $libraryFilePath
#### Output
merged-library.xml
