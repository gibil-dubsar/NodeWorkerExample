import * as cheerio from 'cheerio';
import {getBrowserPage, dumpHTML} from "./browser.js";
import * as workerpool from 'workerpool'
const getPage = getBrowserPage();
const searchWord:string = "node";
interface SearchResult {
    title: string;
    link: string;
}
async function startSearch(): Promise<void>{
    const browserPage = await getPage();
    const results: SearchResult[] = [];
    await browserPage.goto(`https://en.wikipedia.org/w/index.php?fulltext=1&search=${searchWord}&title=Special%3ASearch&ns0=1`, {waitUntil: 'networkidle2'});


    const $ = cheerio.load(await browserPage.content());
    $('div.mw-search-result-heading > a').each((index, element) => {
        const title = $(element).text();
        const link = $(element).attr('href');
        console.log(link, title)
        if (link) {
            results.push({ title, link });
        }
    });

    // // Click the button
    // //await browserPage.click('.QS5gu.sy4vM');
    // let content = await browserPage.content();
    // dumpHTML(content);
    //
    // // Press Enter to search
    // await browserPage.keyboard.press('Enter');
    //
    // // // Wait for the results to load (adjust selector and timeout if needed)
    // //await browserPage.waitForSelector('div.oewGkc', { timeout: 5000 });
    //
    // content = await browserPage.content(); // Get the HTML content
    // const $ = cheerio.load(content); // Load the content into Cheerio
    //
    //
    // // $('div.cz3goc.OcpZAb').each((index, element) => {
    // //     const linkElement = $(element).parent().parent();
    // //     const title = $(element).text();
    // //     const link = $(element).attr('href');
    // //     console.log(link, title)
    // //     if (link) {
    // //         results.push({ title, link });
    // //     }
    // // });

    console.log(results);



}
startSearch();
