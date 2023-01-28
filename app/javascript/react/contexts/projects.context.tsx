// external imports
import { ReactNode, createContext, useState, useEffect } from "react";

// internal imports
import { getProjects, ProjectType } from "../utils/backend-api";

// types
type ProjectsContextProps = {
  projects: ProjectType[];
}

type ProjectsProviderProps = {
  children: ReactNode
}

// context
export const ProjectsContext = createContext<ProjectsContextProps>({
  projects: []
})

// provider
export const ProjectsProvider = ({ children }: ProjectsProviderProps) => {
  // initialize state an empty array
  const [ projects, setProjects ] = useState<ProjectType[]>([])

  // call backend getProjects array on mount
  useEffect(() => {
    const getProjectsArray = async () => {
      const projectsArray = await getProjects();
      setProjects(projectsArray);
    }
    getProjectsArray();
  }, [])

  const value = { projects }

  return <ProjectsContext.Provider value={ value }>{ children }</ProjectsContext.Provider>
}