// create a Project type from the json-serialized model
export type ProjectType = {
  id: string;
  type: string;
  attributes: {
    id: string;
    role: string;
    title: string;
    date: Date;
    client?: string;
    production_company?: string;
    agency?: string;
    project_url?: string;
    thumbnail_url?: string;
  }
}

// create a projectMap type representing the json response from the backend
export type ProjectMap = {
  data: ProjectType[] 
}

// primary api call to backend to retrieve all projects in the db
export const getProjectMap = async () => {
  const projectMapResponse = await fetch('projects.json');
  const projectMap: ProjectMap = await projectMapResponse.json();
  return projectMap 
}