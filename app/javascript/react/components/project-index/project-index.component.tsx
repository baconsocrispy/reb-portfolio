import { useContext } from "react";

import ProjectPreview from "../project-preview/project-preview.component";

import { ProjectsContainer } from "./project-index.styles"
import { ProjectsContext } from "../../contexts/projects.context";

const ProjectIndex = () => {
  // retrieve project map and destructure the projects array
  const { projectMap } = useContext(ProjectsContext)
  const { data: projects } = projectMap

  // iterate through projects array, creating project component for each element
  return (
    <ProjectsContainer>
      {projects && projects.map((project) => (
          <ProjectPreview key={ project.id } project={ project } />
        ))
      }
    </ProjectsContainer>
  )
}

export default ProjectIndex