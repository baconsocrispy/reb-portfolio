// external imports
import { Fragment, useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ModalProvider } from 'styled-react-modal';

// internal imports
import { ProjectsContext } from "../../contexts/projects.context"
import { AdminContext } from "../../contexts/admin.context"
import Project from "../../components/project/project.component"
import { ConfirmationModal } from '../../components/confirmation-modal/confirmation-modal.component'
import Spinner from "../../components/spinner/spinner.component";

// api
import { deleteProject, ProjectType } from '../../utils/backend-api'

// styles
import { 
  ButtonContainer, 
  DeleteProjectButton, 
  EditProjectButton
} from "./project-page.styles"
import { 
  ModalButton, 
  ModalButtonContainer, 
  ModalMessage 
} from "../../components/confirmation-modal/confirmation-modal.styles";
import { 
  PageContent 
} from "../../components/page-content/page-content.styles"
import NotFound from "../not-found/not-found.component";

// component
const ProjectPage = () => {
  // state
  const { admin } = useContext(AdminContext);
  const { projects } = useContext(ProjectsContext);
  const [ project, setProject ] = useState<ProjectType | null>(null)
  const [ loading, setLoading ] = useState(true);
  const [ modalOpen, setModalOpen ] = useState(false);

  // wait for projects to load and set page project accordingly
  useEffect(() => {
    projects.length && setLoading(false)
    const project = projects.find(
      (project) => project.id.toString() == id
    )
    project ? setProject(project) : setProject(null)
  }, [ projects ])

  // navigation
  const navigate = useNavigate();

  // destructure params
  const { id } = useParams()
 
  // ------------ ON CLICK HANDLERS ---------------
  // delete project
  const handleDeleteProject = async ()  => {
    if (!project) return;
    const response = await deleteProject(project.id)
    alert('Project deleted successfully')
    navigate('/')
    location.reload();
  }
  
  // open and close modal
  const toggleModal = () => setModalOpen(!modalOpen)

  // navigate to edit page
  const handleEditProject = () => {
    if (!project) return;
    const editRoute = `/portfolio/${project.id}/edit-project`
    navigate(editRoute)
  }
  
  // component elements
  return (
    <PageContent>
      {/* wait for project to load before display */}
      { project && <Project project={ project } /> }

      {/* if no project found after load, display not found */}
      { (!loading && !project) && <NotFound /> }

      {/* create admin container */}
      { admin && project &&
        <Fragment>
          <ButtonContainer>
            <EditProjectButton onClick={ handleEditProject }>
              Edit Project
            </EditProjectButton>
            <DeleteProjectButton onClick={ toggleModal }>
              Delete Project
            </DeleteProjectButton>
          </ButtonContainer>
          
          {/* modal helps prevent accidental project deletion */}
          <ModalProvider>
            <ConfirmationModal
              isOpen={ modalOpen }
              onBackgroundClick={ toggleModal }
              onEscapeKeydown={ toggleModal }
            >
              <ModalMessage>Are you sure you want to delete this project?</ModalMessage>
              <ModalButtonContainer>
                <ModalButton onClick={ handleDeleteProject }>Yes</ModalButton>
                <ModalButton onClick={ toggleModal }>No</ModalButton>
              </ModalButtonContainer>
            </ConfirmationModal>
          </ModalProvider>
        </Fragment>
      }
    </PageContent>
  )
}

export default ProjectPage