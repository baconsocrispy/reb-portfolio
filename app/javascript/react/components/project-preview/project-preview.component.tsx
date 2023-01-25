// external imports
import { FC, useContext, useState, MouseEvent } from "react"
import { useNavigate } from "react-router-dom"
import { Draggable } from "react-beautiful-dnd"
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons"
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons"

// internal imports
import { AdminContext } from "../../contexts/admin.context"
import { ProjectType, updateProjectActiveStatus } from "../../utils/backend_api"

// styles
import { 
  ActiveSwitch,
  ProjectContainer, 
  ProjectThumbnail, 
  ProjectTitle,
} from "./project-preview.styles"

// types
type ProjectPreviewProps = {
  project: ProjectType,
  index: number;
}

// component
const ProjectPreview: FC<ProjectPreviewProps> = ({ project, index }) => {
  // destructure project elements
  const { attributes } = project
  const {
    id,
    thumbnail_url,
    title,
    active_status
  } = attributes

  // state
  const { admin } = useContext(AdminContext)
  const [ active, setActive ] = useState(active_status)

  // navigation
  const navigate = useNavigate();

  // ----------- ON CLICK HANDLERS
  // navigate to project page when clicking on a project
  // regex formats title for more readable url
  const route = `portfolio/${ id }/${ title.replace(/\s+/g, '-')}`
  const onNavigateHandler = () => navigate(route);

  // on click handler for switching active status
  const activeSwitchHandler = async (event: MouseEvent<SVGSVGElement>) => {
    // prevents onNavigateHandler from triggering on click
    event.stopPropagation();
    const statusResponse = await updateProjectActiveStatus(id)
    setActive(statusResponse)
  }
  
  return (
    // draggable requires an id and an index (passed from parent)
    <Draggable 
      draggableId={ id.toString() } 
      index={ index }
      isDragDisabled={ !admin }
    >
      {/* draggable expects children to be wrapped in a function per below */}
      {(provided) => (
        <ProjectContainer
          onClick={ onNavigateHandler }
          { ...provided.draggableProps }
          { ...provided.dragHandleProps }
          ref={ provided.innerRef }
        >
          { admin &&
            <ActiveSwitch 
              icon={ active ? solidStar : regularStar }
              onClick={ activeSwitchHandler }
            />
          }
          <ProjectThumbnail src={ thumbnail_url } />
          <ProjectTitle>{ title }</ProjectTitle>
          {/* <ActiveSwitch active={ active }></ActiveSwitch> */}
        </ProjectContainer>
      )}
    </Draggable>
  )
}

export default ProjectPreview