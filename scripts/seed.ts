import mongoose from "mongoose";
import { connectDatabase } from "../src/config/database";
import { Achievement } from "../src/models/Achievement";
import { Education } from "../src/models/Education";
import { Experience } from "../src/models/Experience";
import { Language } from "../src/models/Language";
import { Profile } from "../src/models/Profile";
import { Project } from "../src/models/Project";
import { Skills } from "../src/models/Skills";

const seed = async (): Promise<void> => {
  await connectDatabase();

  await Promise.all([
    Profile.deleteMany({}),
    Skills.deleteMany({}),
    Experience.deleteMany({}),
    Education.deleteMany({}),
    Achievement.deleteMany({}),
    Language.deleteMany({}),
    Project.deleteMany({}),
  ]);

  await Profile.create({
    name: "Nigar Həsənzadə",
    title: "Frontend Developer",
    phone: "(051) 717-18-36",
    email: "nigarhesenzade703@gmail.com",
    location: "Bakı, Azərbaycan",
    github: "https://github.com/NigarHasanzda",
    linkedin: "https://linkedin.com/in/nigar-hasanzada",
    professionalSummary:
      "React, Next.js və TypeScript üzrə təcrübəyə malik Frontend Developer. REST API inteqrasiyası, Redux Toolkit state management, təkrar istifadə oluna bilən komponent arxitekturası, Agile komanda mühitində iş, code review, performans optimizasiyası və responsiv interfeyslər üzrə təcrübəyə malikəm.",
    profileImage: "",
    resumeUrl: "",
  });

  await Skills.create({
    programmingLanguages: [
      "JavaScript (ES6+)",
      "TypeScript",
      "HTML5",
      "CSS3",
    ],
    frameworks: ["React.js", "Next.js", "Node.js", "Express.js", "MongoDB"],
    styling: [
      "Tailwind CSS",
      "MUI",
      "SCSS",
      "Responsive Design",
      "Flexbox",
      "CSS Grid",
    ],
    stateManagementAndApi: [
      "Redux Toolkit",
      "Context API",
      "REST API",
      "Axios",
    ],
    toolsAndPlatforms: ["Git", "GitHub", "Postman", "Google Cloud", "Vercel"],
    aiTools: ["Claude Code", "Cursor", "ChatGPT", "Gemini"],
    methodologies: ["Agile/Scrum", "Code Review", "Sprint Planning"],
    personalSkills: [
      "Analytical thinking",
      "Problem solving",
      "Teamwork",
      "Attention to detail",
      "Agile work principles",
      "Fast learning / adaptability",
    ],
  });

  await Experience.insertMany([
    {
      company: "Ante Technologies",
      position: "Frontend Developer",
      location: "Bakı, Azərbaycan",
      startDate: "2026-07",
      endDate: null,
      isCurrent: true,
      order: 1,
      technologies: ["React", "Next.js", "TypeScript"],
      responsibilities: [
        "React, Next.js və TypeScript əsasında məhsul interfeyslərinin hazırlanması və mövcud modulların inkişaf etdirilməsi.",
        "Backend komandası ilə birgə REST API inteqrasiyalarının qurulması və dinamik data axınının idarə olunması.",
        "Təkrar istifadə oluna bilən komponent strukturunun formalaşdırılması və kod keyfiyyətinin code review prosesləri ilə qorunması.",
      ],
    },
    {
      company: "Kapital Bank",
      position: "Frontend Developer (Intern)",
      location: "Bakı, Azərbaycan",
      startDate: "2026-02",
      endDate: "2026-07",
      isCurrent: false,
      order: 2,
      technologies: ["React", "TypeScript"],
      responsibilities: [
        "Bankın daxili platformalarının interfeysinin müasir veb texnologiyaları ilə yenilənməsi və istifadəçi təcrübəsinin yaxşılaşdırılması.",
        "Agile prinsipləri əsasında aparılan code review proseslərində iştirak və təkrar istifadə oluna bilən komponentlərin hazırlanması.",
        "Geniş istifadəçi kütləsi olan sistemdə UI detallarına diqqət yetirilməsi və performansın artırılmasına töhfə verilməsi.",
      ],
    },
    {
      company: "Burncode MMC",
      position: "Frontend Developer",
      location: "Bakı, Azərbaycan",
      startDate: "2025-08",
      endDate: "2026-05",
      isCurrent: false,
      order: 3,
      technologies: ["React", "JavaScript", "REST API"],
      responsibilities: [
        "Real layihələr üzərində sıfırdan responsiv və sürətli işləyən frontend tətbiqlərinin qurulması.",
        "Backend komandası ilə mürəkkəb REST API-lərin inteqrasiyası və dinamik data axınının idarə edilməsi.",
        "Tətbiqin müxtəlif brauzerlərdə eyni keyfiyyətdə görünməsi üçün cross-browser uyğunluq yoxlamalarının aparılması.",
      ],
    },
  ]);

  await Education.insertMany([
    {
      institution: "Azərbaycan Texniki Universiteti",
      degree: "Bachelor of Computer Science",
      type: "university",
      startDate: "2022",
      endDate: "2026",
      description: "",
      order: 1,
    },
    {
      institution: "CodeAcademy",
      degree: "Frontend Course",
      type: "course",
      startDate: "2025-02",
      endDate: "2025-06",
      description: "",
      order: 2,
    },
    {
      institution: "Jet Academy",
      degree: "Backend Developer Course",
      type: "course",
      startDate: "2024-06",
      endDate: "2024-10",
      description: "",
      order: 3,
    },
  ]);

  await Achievement.create({
    title: "CodeAcademy Code8 Hackathon",
    year: 2025,
    result: "Winner",
    description:
      "Agile prinsipləri əsasında məhdud vaxt ərzində komanda ilə funksional məhsulun hazırlanması və birinciliyin qazanılması.",
    image: "",
    certificateUrl: "",
    order: 1,
  });

  await Language.insertMany([
    { language: "Turkish", level: "C2", order: 1 },
    { language: "English", level: "B1", order: 2 },
    { language: "Russian", level: "A1", order: 3 },
  ]);

  console.log("Database seeded successfully (projects left empty).");
  await mongoose.disconnect();
};

seed().catch((error: unknown) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
