

import { Request, Response } from "express";
import { getAvgEstimatedGas } from '../service/AvgFeeEstimate.service';


import logger from "../utils/logger";

export async function getAvgFor5BlocksEstimatedGasHandler(
  req: Request,
  res: Response
) {
  try {
    const estimates = await getAvgEstimatedGas();
    return res.send(estimates);
    
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}