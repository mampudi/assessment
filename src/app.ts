import express from 'express';
import config from 'config';
import logger from '../src/utils/logger';
import routes from '../src/routes'
import {start} from './service/FeeEstimate.service'
import {check} from './service/MemPool.service'


//getting it using the config npm package which lets you define a set of default parameters, 
//and extend them for different deployment environments (development, qa, staging, production, etc.).
//.get gets a generic type and we can set it as a number
const port = config.get<number>('port');

const app = express();

app.listen(port, async () => {
    logger.info(`App is running at http://localhost:${port}`);
    await start();
    //await check();
    routes(app);
})