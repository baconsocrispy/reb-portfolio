// external imports
import { useContext } from "react"

// internal imports
import { AdminContext } from "../../contexts/admin.context"
import { PageContent } from "../../components/page-content/page-content.styles"
import ProjectForm from "../../components/project-form/project-form.component"
import NotFound from "../not-found/not-found.component"

// component
const NewProject = () => {
  // state 
  const { admin } = useContext(AdminContext)

  // component elements
  return (
    <PageContent>
      { admin ? 
        <ProjectForm project={ null }/> :
        <NotFound />
      }
    </PageContent>
  )
}

export default NewProject