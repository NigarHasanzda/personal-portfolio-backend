import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  CreateProjectInput,
  ProjectQueryInput,
  UpdateProjectInput,
} from "../validations/project.validation";
import * as projectService from "../services/project.service";

export const listProjects = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query as unknown as ProjectQueryInput;
  const result = await projectService.listProjects(query);
  res.status(200).json({
    success: true,
    data: result.data,
    pagination: result.pagination,
  });
});

export const getProject = asyncHandler(async (req: Request, res: Response) => {
  const data = await projectService.getProjectById(req.params.id);
  res.status(200).json({ success: true, data });
});

export const getProjectBySlug = asyncHandler(async (req: Request, res: Response) => {
  const data = await projectService.getProjectBySlug(req.params.slug);
  res.status(200).json({ success: true, data });
});

export const createProject = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body as CreateProjectInput;
  const data = await projectService.createProject(body);
  res.status(201).json({
    success: true,
    message: "Project created successfully",
    data,
  });
});

export const updateProject = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body as UpdateProjectInput;
  const data = await projectService.updateProject(req.params.id, body);
  res.status(200).json({
    success: true,
    message: "Project updated successfully",
    data,
  });
});

export const deleteProject = asyncHandler(async (req: Request, res: Response) => {
  const data = await projectService.deleteProject(req.params.id);
  res.status(200).json({
    success: true,
    message: "Project deleted successfully",
    data,
  });
});
