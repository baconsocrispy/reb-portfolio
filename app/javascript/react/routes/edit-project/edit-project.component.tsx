// external imports
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { PageContent } from '../../components/page-content/page-content.styles'

// internal imports
import ProjectForm from '../../components/project-form/project-form.component'
import { AdminContext } from '../../contexts/admin.context'
import { ProjectsContext } from '../../contexts/projects.context'
import NotFound from '../not-found/not-found.component'

// component
const EditProject = () => {
  // destructure params
  const { id } = useParams()

  // state
  const { admin } = useContext(AdminContext)
  const { projectMap } = useContext(ProjectsContext)

  // destructure the projects from the response
  const projects = projectMap ? projectMap.data : []

  // find the current project matching the project id
  const project = projects ? projects.find(
    (project) => project.id === id
  ) : null

  // component elements
  return (
    <PageContent>
      { (admin && project) ? 
          <ProjectForm project={ project } /> :
          <NotFound />
      }
    </PageContent>
    
  )
}

export default EditProject