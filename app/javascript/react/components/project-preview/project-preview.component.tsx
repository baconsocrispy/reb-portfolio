// external imports
import { FC, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Draggable } from "react-beautiful-dnd"

// internal imports
import { AdminContext } from "../../contexts/admin.context"
import { ProjectType } from "../../utils/backend_api"

// styles
import { 
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
  // state
  const { admin } = useContext(AdminContext)
  // destructure project elements
  const { attributes } = project
  const {
    id,
    thumbnail_url,
    title
  } = attributes

  // navigate to project page when clicking on a project
  // regex formats title for more readable url
  const route = `portfolio/${ id }/${ title.replace(/\s+/g, '-')}`
  const navigate = useNavigate();
  const onNavigateHandler = () => navigate(route);
  
  return (
    // draggable requires an id and an index (passed from parent)
    <Draggable 
      draggableId={ id.toString() } 
      index={ index }
      isDragDisabled={ admin ? false : true }
    >
      {/* draggable expects children to be wrapped in a function per below */}
      {(provided) => (
        <ProjectContainer
          onClick={onNavigateHandler}
          { ...provided.draggableProps }
          { ...provided.dragHandleProps }
          ref={ provided.innerRef }
        >
          <ProjectThumbnail src={ thumbnail_url } />
          <ProjectTitle>{ title }</ProjectTitle>
        </ProjectContainer>
      )}
    </Draggable>
  )
}

export default ProjectPreview