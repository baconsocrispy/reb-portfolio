// external imports
import { useState, FC } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

// internal imports
import { FormInput, FormLabel } from "../contact-form/contact-form.styles"

// api
import { 
  createProject, 
  ProjectType, 
  updateProject,
  addThumbnailToProjectFormData
} from "../../utils/backend_api"

// styles
import {
  NewProjectContainer,
  ProjectFormContainer,
  ProjectFormHeader,
  ProjectFormSubmitButton,
  FormErrorMessage
} from "./project-form.styles"

// types
import { SubmitStatus } from "../admin-form/admin-form.component"
export type ProjectFormData = {
  project: {
    id: string | null;
    project_url?: string;
    title: string;
    role: string;
    client?: string;
    production_company?: string;
    agency?: string;
    thumbnail_url?: string;
    date: string;
  }
}

type ProjectFormProps = {
  project: ProjectType | null;
}

// display thumbnail above form

// component
const ProjectForm: FC<ProjectFormProps> = ({ project }) => {
  // state
  const [ submitStatus, setSubmitStatus ] = useState<SubmitStatus | null>(null)

  // navigation
  const navigate = useNavigate();
  
  // destructure useForm elements & pass form data type
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ProjectFormData>()

   // ------------ ON SUBMIT HANDLER ---------------
  const onProjectFormSubmitHandler: SubmitHandler<ProjectFormData> = async (data) => {
    // update project thumbnail_url from project url
    const projectData = addThumbnailToProjectFormData(data)

    // backend call to create or update a project
    const response = project ? 
      await updateProject(projectData) : 
      await createProject(projectData)

    // destructure server response
    const { status: responseStatus } = response
    // if project created successfully update and reroute to project page
    if (responseStatus.code === 200 ) {
      const { id, title } = response.data.data.attributes
      const route = `/portfolio/${id}/${title.replace(/\s+/g, '-')}`
      navigate(route)
      location.reload();

      // if errors set submit status
    } else if (responseStatus.errors) {
      setSubmitStatus({
        message: responseStatus.message,
        errors: responseStatus.errors
      }) 
    }
  }

  // component elements
  return (
    <NewProjectContainer>
      <ProjectFormHeader>{ project ? 'Edit' : 'Enter' } Project Details</ProjectFormHeader>

      {/* display a success/failure message on form submit */}
      {submitStatus && submitStatus.errors && <FormErrorMessage>{submitStatus.message}</FormErrorMessage>}

      <ProjectFormContainer>
        <form onSubmit={ handleSubmit( onProjectFormSubmitHandler)}>
          <FormLabel htmlFor='project_url'>Project URL</FormLabel>
          <FormInput 
            type='text' 
            {...register('project.project_url')} 
            defaultValue={ project ? project.attributes.project_url : '' }
          />

          {errors.project?.title && <FormErrorMessage>{errors.project.title.message}</FormErrorMessage>}
          <FormLabel htmlFor='title'>Title</FormLabel>
          <FormInput 
            type='text' 
            {...register('project.title', { required: 'Title is required'})}
            defaultValue={ project ? project.attributes.title : '' }
          />

          {errors.project?.role && <FormErrorMessage>{errors.project.role.message}</FormErrorMessage>}
          <FormLabel htmlFor='role'>Role</FormLabel>
          <FormInput 
            type='text' 
            {...register('project.role', { required: 'Role is required' })}
            defaultValue={ project ? project.attributes.role : '' }  
          />

          <FormLabel htmlFor='client'>Client</FormLabel>
          <FormInput 
            type='text' 
            {...register('project.client')}
            defaultValue={ project ? project.attributes.client : '' }
          />

          <FormLabel htmlFor='production_company'>Production Company</FormLabel>
          <FormInput 
            type='text' 
            {...register('project.production_company')}
            defaultValue={ project ? project.attributes.production_company : '' }
          />

          <FormLabel htmlFor='agency'>Agency</FormLabel>
          <FormInput 
            type='text' 
            {...register('project.agency')}
            defaultValue={ project ? project.attributes.agency : '' }  
          />

          {errors.project?.date && <FormErrorMessage>{errors.project.date.message}</FormErrorMessage>}
          <FormLabel htmlFor='date'>Date</FormLabel>
          <FormInput 
            type='date' 
            {...register('project.date', { required: 'Date is required' })} 
            defaultValue={project ? project.attributes.date : ''}
          />

          { project && 
            <FormInput 
              type='hidden' 
              {...register('project.id')} 
              defaultValue={ project.id } 
            />
          }

          <ProjectFormSubmitButton>Submit</ProjectFormSubmitButton>
        </form>
      </ProjectFormContainer>
    </NewProjectContainer>
  )
}

export default ProjectForm