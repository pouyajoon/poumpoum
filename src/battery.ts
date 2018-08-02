import * as puppeteer from 'puppeteer';


export const batteryCheck = async () => {
    const browser = await puppeteer.launch({ headless: false, devtools: true });
    const page = await browser.newPage();
    await page.goto('http://localhost/battery');

    page.on('metrics', e => {
        console.log('metrics', e);
    })
    page.addListener('chargingchange', e => {
        console.log('addListener', e);
    })
    // await browser.close();
};