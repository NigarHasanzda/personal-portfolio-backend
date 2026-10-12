import { FilterQuery } from "mongoose";
import { Project, IProject } from "../models/Project";
import { ProjectQueryInput } from "../validations/project.validation";
import { ApiError } from "../utils/ApiError";
import {
  CreateProjectInput,
  UpdateProjectInput,
} from "../validations/project.validation";

const buildProjectFilter = (
  query: ProjectQueryInput
): FilterQuery<IProject> => {
  const filter: FilterQuery<IProject> = {};

  if (query.featured !== undefined) {
    filter.featured = query.featured;
  }
  if (query.category) {
    filter.category = query.category;
  }
  if (query.technology) {
    filter.technologies = query.technology;
  }
  if (query.search) {
    filter.$or = [
      { title: { $regex: query.search, $options: "i" } },
      { shortDescription: { $regex: query.search, $options: "i" } },
      { description: { $regex: query.search, $options: "i" } },
    ];
  }

  return filter;
};

export const listProjects = async (query: ProjectQueryInput) => {
  const filter = buildProjectFilter(query);
  const page = query.page;
  const limit = query.limit;
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    Project.find(filter).sort({ order: 1, createdAt: -1 }).skip(skip).limit(limit).lean(),
    Project.countDocuments(filter),
  ]);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 1,
    },
  };
};

export const getProjectById = async (id: string) => {
  const project = await Project.findById(id).lean();
  if (!project) {
    throw new ApiError(404, "Project not found");
  }
  return project;
};

export const getProjectBySlug = async (slug: string) => {
  const project = await Project.findOne({ slug: slug.toLowerCase() }).lean();
  if (!project) {
    throw new ApiError(404, "Project not found");
  }
  return project;
};

export const createProject = async (input: CreateProjectInput) => {
  const project = await Project.create(input);
  return project.toObject();
};

export const updateProject = async (id: string, input: UpdateProjectInput) => {
  const project = await Project.findByIdAndUpdate(id, input, {
    new: true,
    runValidators: true,
  }).lean();
  if (!project) {
    throw new ApiError(404, "Project not found");
  }
  return project;
};

export const deleteProject = async (id: string) => {
  const project = await Project.findByIdAndDelete(id).lean();
  if (!project) {
    throw new ApiError(404, "Project not found");
  }
  return project;
};
