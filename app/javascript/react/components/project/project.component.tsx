// external imports
import { FC } from "react"

// api
import { ProjectType } from "../../utils/backend_api"

// styles
import { 
  ProjectContainer, 
  Content, 
  ContentContainer, 
  DetailsContainer, 
  ProjectDetail, 
  ProjectHeader
} from "./project.styles"

// types
type ProjectProps = {
  project: ProjectType
}

// component
const Project:FC<ProjectProps> = ({ project }) => {
  // destructure project details
  const { attributes } = project
  const {
    title,
    role,
    client,
    production_company,
    project_url,
    agency
  } = attributes

  // component elements
  return (
    <ProjectContainer>
      <ProjectHeader>{ title }</ProjectHeader>
      <ContentContainer className="content-container">
        <Content
          src={ project_url }
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></Content>
      </ContentContainer>

      <DetailsContainer>
        <ProjectDetail>{ role }</ProjectDetail>
        { client && 
          <ProjectDetail>Client: { client }</ProjectDetail> 
        }
        { production_company && 
          <ProjectDetail>
            Production Company: { production_company }
          </ProjectDetail> 
        }
        { agency && 
          <ProjectDetail>Agency: { agency }</ProjectDetail> 
        }
      </DetailsContainer>
    </ProjectContainer>

  )
}

export default Project


 