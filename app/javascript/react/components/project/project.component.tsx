// external imports
import { FC, useState } from "react"

// api
import { ProjectType } from "../../utils/backend-api"
import Spinner from "../spinner/spinner.component"

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

  // state
  const [ loading, setLoading ] = useState(true)

  // component elements
  return (
    <ProjectContainer>
      <ProjectHeader>{ title }</ProjectHeader>
      <ContentContainer className="content-container">
        { loading ? <Spinner /> : null }
        <Content
          src={ project_url }
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={ loading ? { display: 'none' } : { display: 'block' }}
          onLoad={() => setLoading(false)}
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


 