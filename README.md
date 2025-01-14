# MTG Story EPUB generator files from URLs

Grab the MTG story articles and generate EPUB files from them.

To generate the epub, this script does some aggressive web scraping, removing elements that are not part of the story article. The logic is very specific to the current MTG story website layout, so this script will not work for other websites and will need to be updated whenever WOTC changes the website.

Updated 2025-01-14 (Aetherdrift)

### Requirements

    1.	Node.js: Ensure you have Node.js installed on your computer. You can download it from Node.js official site.
    2.	Dependencies: The script uses the following Node.js packages:
    •	axios for making HTTP requests.
    •	cheerio for HTML parsing and manipulation.
    •	epub-gen for generating EPUB files.

Install these dependencies by running the following command in your terminal:

```
npm install
```

### Setup

1. Make the Script Executable:

If you are using a UNIX-based system (Linux or macOS), you can make the script executable by running:

```
chmod +x generateEpub.js
```

### Usage

    1.	Run the Script: Use the following command in your terminal to run the script and pass the URLs as arguments:

```
node generateEpub.js <url1> <url2> ...
```

Replace <url1>, <url2>, etc., with the actual URLs you want to convert into EPUB files.
For example:

```
node generateEpub.js https://example.com/article1 https://example.com/article2
```

    2.	EPUB Files: The script will generate EPUB files for each URL provided in the command line arguments. The files will be saved in the current working directory with names based on the article titles (spaces replaced with underscores).

### Notes

    •	The script expects the article’s content to be inside an HTML element with the ID #article-body. If the website structure differs, you may need to modify this line:

```
const contentElement = $('#article-body');
```

Replace #article-body with the appropriate selector for the website you are processing.

    •	Ensure the URLs you pass are publicly accessible and the website does not block web scraping.

### Example Output

For a webpage with the title “My Article”, the script will generate a file named My_Article.epub in the current directory.

Let me know if you have additional questions!
