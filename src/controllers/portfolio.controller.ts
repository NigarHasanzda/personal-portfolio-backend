import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { getPortfolioData } from "../services/portfolio.service";

export const getPortfolio = asyncHandler(async (_req: Request, res: Response) => {
  const data = await getPortfolioData();
  res.status(200).json({ success: true, data });
});
