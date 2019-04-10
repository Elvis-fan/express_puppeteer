import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import { getData } from "./interface";
import { logger } from './logger';
import * as os from "os";

const config = require('../config.json');
const app = express();

const numCPUs = os.cpus().length;

app.use(bodyParser.json());
app.use(express.static('D:\\code\\xgz\\ui\\app', { cacheControl: true, maxAge: 0 }));

let countNum = 0;
let maxCountNum = 0;
let openingChromNum = 0;
setInterval(() => {
    if (maxCountNum == 0) {
        maxCountNum = countNum;
    }

    if (countNum > maxCountNum) {
        maxCountNum = countNum;
    }
    logger.debug(`${config.interval / 1000} second counts the number of calls: ${countNum}, max count ${maxCountNum}`);
    countNum = 0;
}, config.interval);
  
app.get('/grab', async (req: any, res: any) => {
    countNum++;
    res.header("Content-Type", "application/json; charset=utf-8");

    if (openingChromNum > config.openingChromNum) {
        logger.error(`number of currently open chrom ${openingChromNum}`);
        if (openingChromNum >= config.thresholdOpeningChromNum) {
            res.send({ "status": 0, "message": "数据峰值过高，请稍候重试" });
            return;
        }
    }

    openingChromNum++;
    try {
        if (req.query['area'] == undefined || req.query['filterBlno'] == undefined || req.query['action'] == undefined) {
            throw Error('Input exceptions, please view the parameters');
        }
        const sendData = await getData(req.query.area, req.query.filterBlno);
        res.send(sendData);
    } catch (e) {
        logger.error(e);
        res.send({ "status": 0, "message": "服务异常" });
    } finally{
        openingChromNum--;
    }
});

app.listen(config.port);
logger.info(`Startup success and running on port ${config.port}`);
