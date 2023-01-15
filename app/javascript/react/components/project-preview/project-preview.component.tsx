import { FC } from "react"
import { useNavigate } from "react-router-dom"

import { ProjectType } from "../../utils/backend_api"

import { 
  ProjectContainer, 
  ProjectThumbnail, 
  ProjectTitle,
} from "./project-preview.styles"

type ProjectPreviewProps = {
  project: ProjectType
}

const ProjectPreview: FC<ProjectPreviewProps> = ({ project }) => {
  // destructure project elements
  const { attributes } = project
  const {
    id,
    thumbnail_url,
    title
  } = attributes

  // navigate to project page when clicking on a project
  const route = `portfolio/${ id }/${ title.replace(/\s+/g, '-')}`
  const navigate = useNavigate();
  const onNavigateHandler = () => navigate(route);
  
  return (
    <ProjectContainer onClick={ onNavigateHandler }>
      <ProjectThumbnail src={ thumbnail_url } />
      <ProjectTitle>{ title }</ProjectTitle>
    </ProjectContainer>
  )
}

export default ProjectPreview