//responsible for taking the http request and forwading it on to a controller
import { Express, Request, Response } from 'express'
import {getEstimatedGasHandler} from '../src/contoller/gas.controller'

//routes is going to take one argument of type express
function routes(app: Express) {
    app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200))

    app.get("/getfeeestimate", getEstimatedGasHandler);
}

export default routes;