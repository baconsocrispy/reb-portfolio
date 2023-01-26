// external imports
import { useContext } from 'react'
import { useParams } from 'react-router-dom'

// internal imports
import ProjectForm from '../../components/project-form/project-form.component'
import { AdminContext } from '../../contexts/admin.context'
import { ProjectsContext } from '../../contexts/projects.context'

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

  return (
    admin && project && <ProjectForm project={ project } /> 
  )
}

export default EditProject