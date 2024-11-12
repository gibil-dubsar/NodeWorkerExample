import puppeteer,{Browser, KnownDevices, Page, } from 'puppeteer';
import {writeFileSync} from 'fs';

export async function dumpHTML(pageHTML:string, filepath:string="Test.html"): Promise<void> {
    writeFileSync(filepath, pageHTML);
}

export function getBrowserPage() {
    let browser: Browser | null = null;

    return async function(): Promise<Page> {
        try {
            if (!browser) {
                browser = await puppeteer.launch({
                    executablePath: '/opt/google/chrome/chrome',
                    headless: false
                });
            }
            // @ts-ignore
            console.log("Issuing new page from browser with pid:",browser.process().pid);

            // @ts-ignore
            let page = await browser.newPage();
            const iPhone = KnownDevices['iPhone 14 Pro Max'];
            await page.emulate(iPhone);
            return page;

        } catch (error) {
            console.error('Error creating page:', error);
            throw error;
        }
    };
}
