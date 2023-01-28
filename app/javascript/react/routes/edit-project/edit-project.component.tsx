// external imports
import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// internal imports
import ProjectForm from '../../components/project-form/project-form.component'
import { AdminContext } from '../../contexts/admin.context'
import { ProjectsContext } from '../../contexts/projects.context'
import NotFound from '../not-found/not-found.component'

// api
import { ProjectType } from '../../utils/backend-api'

// styles
import { PageContent } from '../../components/page-content/page-content.styles'

// component
const EditProject = () => {
  // destructure params
  const { id } = useParams()

  // state
  const { admin } = useContext(AdminContext)
  const { projects } = useContext(ProjectsContext)
  const [ project, setProject ] = useState<ProjectType | null>(null)
  const [ loading, setLoading ] = useState(true);

  // wait for projects to load and set page project accordingly
  useEffect(() => {
    projects.length && setLoading(false)
    const project = projects.find(
      (project) => project.id.toString() == id
    )
    project ? setProject(project) : setProject(null)
  }, [projects])

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