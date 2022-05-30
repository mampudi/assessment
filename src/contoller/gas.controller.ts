

import { Request, Response } from "express";
import { getEstimatedGas } from '../service/FeeEstimate.service';


import logger from "../utils/logger";

export async function getEstimatedGasHandler(
  req: Request,
  res: Response
) {
  try {
    const estimates = await getEstimatedGas();
    return res.send(estimates);
    
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}