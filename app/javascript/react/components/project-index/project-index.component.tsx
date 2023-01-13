import { useState, useEffect, useContext } from "react";

import Project from "../project/project.component";

import { ProjectsContainer } from "./project-index.styles"
import { ProjectsContext } from "../../contexts/projects.context";

const ProjectIndex = () => {
  const { projects } = useContext(ProjectsContext)
  
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