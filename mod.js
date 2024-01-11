const puppeteer = require('puppeteer');

//I have loaded all table data from the website alura.io in the console
//I have not shown in screen because I cannot store this much of data on my Firestore and I will need to choose which columns to store according to requirement of the project

async function scrapeWebsite() {
    const browser = await puppeteer.launch({
        headless: 'new', // Opt in to the new headless mode
    });
    const page = await browser.newPage();

    // Rest of your Puppeteer script...
    try {
        // Navigate to the website
        //I am using alura.io
        await page.goto('https://www.alura.io/best-selling-etsy-items', { waitUntil: 'domcontentloaded' });
        console.log("reached ")

        // Wait for the table to load (replace with your actual selector)
        const selector = 'body > div:nth-child(1) > div.bs-page > main > div.bs-content > div.bs-table';
        await page.waitForSelector(selector, { timeout: 30000 });
        console.log("got")

        // Extract data from the selected elements
        const data = await page.evaluate(selector => {
            const elements = document.querySelectorAll('body > div:nth-child(1) > div.bs-page > main > div.bs-content > div.bs-table > div.bs-table-content > div:nth-child(2) > div > div.w-dyn-items');
            const extractedData = [];
            elements.forEach(element => {
                extractedData.push(element.textContent.trim());
            });
            return extractedData;
        }, selector);

        // Display the extracted data
        console.log(data);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Close the browser
        await browser.close();
    }

}

// Run the scraping function
scrapeWebsite();