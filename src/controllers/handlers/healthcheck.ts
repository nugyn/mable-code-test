import logger from "../utils/logger";
import { Response, Request } from "express";

export const healthCheck = async (_req: Request, res: Response) => {
  logger.info("Server is starting");
  res.status(200).json({status: 'ok'})
};
