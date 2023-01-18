import { Fragment, useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { ProjectsContext } from "../../contexts/projects.context"
import { ProjectType } from '../../utils/backend_api'

import PageHeader from "../../components/page-header/page-header.component"
import { ProjectTitle } from "../../components/project-preview/project-preview.styles"
import Project from "../../components/project/project.component"

const ProjectPage = () => {
  // get current project from the parameters
  const { id } = useParams()
  const projectId = id ? id : '0'
  // get the project map from projects context
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