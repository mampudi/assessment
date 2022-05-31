

import { Request, Response } from "express";
import { getAvg30EstimatedGas } from '../service/Avg30FeeEstimate.service';


import logger from "../utils/logger";

export async function getAvgFor30BlocksEstimatedGasHandler(
  req: Request,
  res: Response
) {
  try {
    const estimates = await getAvg30EstimatedGas();
    return res.send(estimates);
    
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}