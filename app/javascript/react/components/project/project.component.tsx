import { FC } from "react"
import { ProjectType } from "../../utils/backend_api"
import { 
  ProjectContainer, 
  Content, 
  ContentContainer, 
  DetailsContainer, 
  ProjectDetail 
} from "./project.styles"

type ProjectProps = {
  project: ProjectType
}

const Project:FC<ProjectProps> = ({ project }) => {
  // destructure project details
  const { attributes } = project
  const {
    role,
    client,
    production_company,
    project_url,
    agency
  } = attributes

  return (
    <ProjectContainer>
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


 