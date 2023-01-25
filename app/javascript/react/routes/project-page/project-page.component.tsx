// external imports
import { useContext, MouseEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"

// internal imports
import { ProjectsContext } from "../../contexts/projects.context"
import { AdminContext } from "../../contexts/admin.context"
import Project from "../../components/project/project.component"
import { PageContent } from "../../components/page-content/page-content.styles"

//api
import { deleteProject, ProjectType } from '../../utils/backend_api'

// styles
import { ButtonContainer, DeleteProjectButton } from "./project-page.styles"

const ProjectPage = () => {
  // state
  const { admin } = useContext(AdminContext)
  // navigation
  const navigate = useNavigate();
  // get current project id from the parameters
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

  const handleDeleteProject= async ()  => {
    const response = await deleteProject(project.id)
    alert('Project deleted successfully')
    navigate('/')
    location.reload();
  }
  
  return (
    <PageContent>
      { projectDetails && <Project project={project} /> }
      { admin && 
        <ButtonContainer>
          <DeleteProjectButton onClick={ handleDeleteProject }>Delete Project</DeleteProjectButton>
        </ButtonContainer>
      }
    </PageContent>
  )
}

export default ProjectPage