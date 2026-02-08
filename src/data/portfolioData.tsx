import data from "./portfolioData.json";
import { getIcon } from "@/lib/iconMap";

export const heroData = data.hero;
export const aboutData = data.about;
export const projectsData = data.projects;

export const achievementsData = data.achievements.map(item => ({
    ...item,
    icon: getIcon(item.icon)
}));

export const venturesData = data.ventures;

export const socialWorksData = data.social.map(item => ({
    ...item,
    icon: getIcon(item.icon)
}));

export const skillsData = data.skills.map(item => ({
    ...item,
    icon: getIcon(item.icon, 24)
}));
