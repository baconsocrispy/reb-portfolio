// external imports
import { useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"

// internal imports
import { ProjectsContext } from "../../contexts/projects.context"
import Project from "../../components/project/project.component"

//api
import { ProjectType } from '../../utils/backend_api'

const ProjectPage = () => {
  // navigation
  const navigate = useNavigate();
  // get current project from the parameters
  const { id } = useParams()
  // if no id, redirect to homepage
  const projectId = id ? id : navigate('/')
  
  // state
  const { projectMap } = useContext(ProjectsContext) || {}

  // destructure the projects from the response
  const projects = projectMap ? projectMap.data : []

  // find the current project matching the project id
  const project = projects ? projects.find(
      (project) => project.id === projectId
    ) || {} as ProjectType : {} as ProjectType
    
  // destructure project details from project
  const { attributes: projectDetails } = project 
  
  return (
    projectDetails && <Project project={ project }/>
  )
}

export default ProjectPage