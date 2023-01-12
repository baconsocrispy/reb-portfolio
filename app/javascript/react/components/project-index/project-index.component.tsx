import { useState, useEffect } from "react";

import Project from "../project/project.component";
import { getProjects, ProjectType } from "../../utils/backend_api";

import { ProjectsContainer } from "./project-index.styles"

const ProjectIndex = () => {
  // initialize state with an empty ProjectType array
  const [ projects, setProjects ] = useState<ProjectType[]>([])
  
  // on mount, get all projects from db and set in projects array
  useEffect(() => {
    const getProjectsArray = async () => {
      const projectsArray = await getProjects()
      setProjects(projectsArray)
    }
    getProjectsArray()
  }, [])
  
  // iterate through projects array, creating a project component for each one
  return (
    <ProjectsContainer>
      {projects.map((project) => (
          <Project key={ project.id } project={ project } />
      ))}
    </ProjectsContainer>
  )
}

export default ProjectIndex