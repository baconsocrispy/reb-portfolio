import React, { createContext, useState, useEffect } from "react";
import { getProjectMap, ProjectMap } from "../utils/backend_api";

// initialize projects context and define props type
type ProjectsContextProps = {
  projectMap: ProjectMap
}

export const ProjectsContext = createContext<ProjectsContextProps>({
  projectMap: {data: []}
})

// initialize projects provider and define props type
type ProjectsProviderProps = {
  children: React.ReactNode
}

export const ProjectsProvider = ({ children }: ProjectsProviderProps) => {
  // initialize state with an empty projects map
  const [ projectMap, setProjectMap ] = useState<ProjectMap>({})

  // on mount, get all projects from db and set in projects map
  // pass empty array as 2nd argument to ensure it only runs on mount
  useEffect(() => {
    const getProjects = async () => {
      const projects = await getProjectMap();
      setProjectMap(projects);
    }
    getProjects();
  }, [])

  const value = { projectMap }

  return <ProjectsContext.Provider value={ value }>{ children }</ProjectsContext.Provider>
}