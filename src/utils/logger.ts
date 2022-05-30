//this is gonna be the logger
import logger from "pino";
//this is gonna be so we can format the timestamp
import dayjs from "dayjs";

const transport = logger.transport({
    target: 'pino-pretty',
    options: { colorize: true }
  })

const pino = logger({
    //makes the the logging look prettier in the console
    base:{
        //this is the process id
        pid: false
    },
    timestamp: () => `,"time":"${dayjs().format()}"`,
}, transport);

export default pino;


