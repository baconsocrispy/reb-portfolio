import React, { createContext, useState, useEffect } from "react";
import { getProjects, ProjectType } from "../utils/backend_api";

type ProjectsContextProps = {
  projects: ProjectType[]
}

export const ProjectsContext = createContext<ProjectsContextProps>({
  projects: []
})

type ProjectsProviderProps = {
  children: React.ReactNode
}

export const ProjectsProvider = ({ children }: ProjectsProviderProps) => {
  // initialize state with an empty projects array
  const [ projects, setProjects ] = useState<ProjectType[]>([])

  // on mount, get all projects from db and set in projects array
  // pass empty array as 2nd argument to ensure it only runs on mount
  useEffect(() => {
    const getProjectArray = async () => {
      const projectArray = await getProjects();
      setProjects(projectArray);
    }
    getProjectArray();
  }, [])

  const value = { projects }

  return <ProjectsContext.Provider value={ value }>{ children }</ProjectsContext.Provider>
}