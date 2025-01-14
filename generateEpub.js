const axios = require('axios');
const cheerio = require('cheerio');
const Epub = require('epub-gen');
const fs = require('fs');
const path = require('path');

const urls = process.argv.slice(2);

async function generateEpub(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const title = $('h1').first().text().trim();
    const contentElement = $('#article-body');
    // Find the time tag and get the author from the adjacent div
    const author = $('time').next('div').text().trim();

    // Remove the breadcrumbs div (for the navigation bar)
    contentElement.find('article > div').first().remove();

    // Remove all iframe tags (for embedded videos/audio)
    contentElement.find('iframe').remove();

    // Remove all img tags
    contentElement.find('img').remove();

    // Remove artist credits (divs next to rtecenter divs)
    // TODO find a better way to do this
    contentElement.find('.rtecenter').each(function() {
      $(this).next('div').remove();
    });

    const contentHtml = contentElement.html();

    if (!title || !contentHtml) {
      console.error(`Missing title or content for URL: ${url}`);
      return;
    }

    const options = {
      title: title,
      author: author,
      content: [
        {
          title: title,
          data: contentHtml,
        },
      ],
    };


    // Ensure the "generated" folder exists
    const outputDir = path.join(__dirname, 'generated');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    const filePath = path.join(outputDir, `${title.replace(/\s+/g, '_')}.epub`);

    new Epub(options, filePath).promise.then(
      () => console.log(`EPUB generated at: ${filePath}`),
      (err) => console.error(`Failed to create EPUB for URL: ${url}`, err)
    );
  } catch (error) {
    console.error(`Error fetching URL: ${url}`, error);
  }
}

urls.forEach(url => {
    generateEpub(url);
});