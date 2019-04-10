import { launch } from 'puppeteer';
import { logger } from './logger';

const config = require('../config.json');

const MQueryCtrl1_dgView = '#MQueryCtrl1_dgView';
/**
 * 爬取数据
 * @param xxx1 入参1
 * @param xxx2 入参2
 */
export async function getData(xxx1: string, xxx2: string): Promise<object> {
    const browser = await launch({
        // 若是手动下载的chromium需要指定chromium地址, 默认引用地址为 /项目目录/node_modules/puppeteer/.local-chromium/
        executablePath: config.chromRoute,
        //设置超时时间
        timeout: 15000,
        //如果是访问https页面 此属性会忽略https错误
        ignoreHTTPSErrors: true,
        // 打开开发者工具, 当此值为true时, headless总为false
        devtools: false,
        // 关闭headless模式, 不会打开浏览器
        headless: true
    });

    const page = await browser.newPage();
    try {
        await page.goto('http://baidu.com');
        // await page.type('#MQueryCtrl1_ddlCustomCode', xxx1, { delay: 0 });
        // await page.type('#MQueryCtrl1_txtChildNo', xxx2, { delay: 0 });

        // let enterBeforTime = new Date().getTime();
        // await page.keyboard.press('Enter');
        // await page.waitForSelector(MQueryCtrl1_dgView);

        // if (new Date().getTime() - enterBeforTime > 1000) {
        //     logger.debug(` filterBIno: ${xxx2} refresh success time: ${new Date().getTime() - enterBeforTime}`);
        // }

        // const text: Array<any> = await page.evaluate(sel => {
        //     return Array.from($(sel).find('tr td')).map(v => {
        //         return v.innerText.replace(/\s/g, '');
        //     });
        // }, MQueryCtrl1_dgView);
        
        if (data === undefined) {
            return {
                "status": 0,
                "message": 'the xxx could not be queried'
            };
        } else {
            return {
                "status": 1,
                "message": 'query was successful'
            };
        }
    } catch (error) {
        logger.log('error', error);
        throw error;
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}