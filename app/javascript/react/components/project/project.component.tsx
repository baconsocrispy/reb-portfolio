import { FC } from "react"
import { Navigate, useNavigate } from "react-router-dom"

import { ProjectType } from "../../utils/backend_api"

import { 
  ProjectContainer, 
  ProjectThumbnail, 
  ProjectTitle,
  ProjectRole
} from "./project.styles"

type ProjectProps = {
  project: ProjectType
}

const Project: FC<ProjectProps> = ({ project }) => {
  // destructure project elements
  const { 
    role, 
    title,
    thumbnail_url 
  } = project

  // navigate to project page when clicking on a project
  const route = `portfolio/${ title }`
  const navigate = useNavigate();
  const onNavigateHandler = () => navigate(route);
  
  return (
    <ProjectContainer onClick={ onNavigateHandler }>
      <ProjectThumbnail src={ thumbnail_url } />
      <ProjectTitle>{ title }</ProjectTitle>
      <ProjectRole>{ role }</ProjectRole>
    </ProjectContainer>
  )
}

export default Project