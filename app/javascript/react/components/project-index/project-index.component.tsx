// external imports
import { useContext, useState, useEffect } from "react";
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

// internal imports
import ProjectPreview from "../project-preview/project-preview.component";
import { ProjectsContext } from "../../contexts/projects.context";
import { ProjectType } from "../../utils/backend_api";

//styles
import { ProjectsContainer } from "./project-index.styles"

//types
type ColumnType = {
 [key: string]: { 
    id: string; 
    title: string; 
    projectIds: string[] 
  }
}

//component
const ProjectIndex = () => {
  // projects state
  const { projectMap } = useContext(ProjectsContext)
  const { data: projects } = projectMap

  // draggable state
  const columns: ColumnType = {
    'column-1': {
      id: 'column-1',
      title: 'projects',
      projectIds: []
    }
  }
  // initialize draggable state with columns (only 1 in this case)
  const [ dragAndDropState, setDragAndDropState ] = useState({ projects, columns })

  // set column projectIds once projects mount
  useEffect(() => {
    const projectIds = projects ? projects.map(project => project.id) : []
    setDragAndDropState({
      ...dragAndDropState,
      projects: projects,
      columns: {
        ...dragAndDropState.columns,
        ['column-1']: {
          ...dragAndDropState.columns['column-1'],
          projectIds: projectIds
        }
      }
    })
  }, [projects])

  // drag and drop handlers
  const onDragEndHandler = (result: DropResult) => {
    // destructure drop result elements
    const { destination, source, draggableId } = result
    // return if there is no destination (dropped outside droppable area)
    if (!destination) return;
    // return if destination matches original position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;
    
    // get droppable column from drag source id
    const column = dragAndDropState.columns[source.droppableId];
    // create a new projectIds object
    const newProjectIds = Array.from(column.projectIds);
    // removes 1 object at the original source index
    newProjectIds.splice(source.index, 1);
    // removes 0 items at destination index and inserts source id at that index
    newProjectIds.splice(destination.index, 0, draggableId);
    // creates a new column with updated project ids array
    const newColumn = {
      ...column,
      projectIds: newProjectIds
    };

    const reorderProjects = (projects: ProjectType[], newProjectIds: string[]) => {
      const newProjects: ProjectType[] = [];
      newProjectIds.map((id) => {
        projects.find((project) => {
          if (project.id === id) {
            newProjects.push(project)
          }
        })
      })
      return newProjects
    }

    const newProjects = reorderProjects(projects, newProjectIds)
    
    setDragAndDropState({
      ...dragAndDropState,
      projects: newProjects,
      columns: {
        ...dragAndDropState.columns,
        [newColumn.id]: newColumn
      }
    })
  }

  return (
    // drag/drop context wraps around sortable container, 
    // requires onDragEnd property
    <DragDropContext onDragEnd={ onDragEndHandler }>
      {/* droppable requires droppableId prop (grid direction comes from ) */}
      <Droppable droppableId="column-1" direction='grid'>
        {/* droppable expects children to be wrapped in a function per below */}
        {provided => (
          <ProjectsContainer
            // droppable requires an innerRef prop and droppableProps
            ref={ provided.innerRef }
            { ...provided.droppableProps }
          >
            {/* passing index prop down as it's required by draggable */}
            { dragAndDropState.projects && dragAndDropState.projects.map((project, index) => (
              <ProjectPreview key={project.id} project={project} index={ index }/>
            ))}
            {/* droppable requires placeholder that handles whitespace on drag */}
            { provided.placeholder }
          </ProjectsContainer>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default ProjectIndex