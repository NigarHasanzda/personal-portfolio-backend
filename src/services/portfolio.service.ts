import { Achievement } from "../models/Achievement";
import { Education } from "../models/Education";
import { Experience } from "../models/Experience";
import { Language } from "../models/Language";
import { Profile } from "../models/Profile";
import { Project } from "../models/Project";
import { Skills } from "../models/Skills";

export const getPortfolioData = async () => {
  const [
    profile,
    skills,
    experience,
    education,
    achievements,
    languages,
    projects,
  ] = await Promise.all([
    Profile.findOne().lean(),
    Skills.findOne().lean(),
    Experience.find()
      .sort({ isCurrent: -1, startDate: -1, order: 1 })
      .lean(),
    Education.find().sort({ order: 1 }).lean(),
    Achievement.find().sort({ order: 1 }).lean(),
    Language.find().sort({ order: 1 }).lean(),
    Project.find().sort({ order: 1, createdAt: -1 }).lean(),
  ]);

  return {
    profile: profile ?? null,
    skills: skills ?? null,
    experience,
    education,
    achievements,
    languages,
    projects,
  };
};
