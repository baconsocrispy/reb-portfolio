// creates a Project type from Project model
export type ProjectType = {
  id: number;
  role: string;
  title: string;
  date: Date;
  client?: string;
  production_company?: string;
  agency?: string;
  project_url?: string;
  thumbnail_url?: string;
}

// fetches and returns an array of all projects in the database
export const getProjects = async () => {
  const projectsResponse = await fetch('projects.json');
  const projects: ProjectType[] = await projectsResponse.json();
  return projects
}