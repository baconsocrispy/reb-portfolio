// external imports
import { useState, useContext } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

// internal imports
import { FormInput, FormLabel } from "../contact-form/contact-form.styles"
import { AdminContext } from "../../contexts/admin.context"

// api
import { addThumbnailToProjectFormData, createProject, getThumbnailUrl } from "../../utils/backend_api"

// styles
import {
  NewProjectContainer,
  ProjectFormContainer,
  ProjectFormHeader,
  ProjectFormSubmitButton,
  SubmitSuccessMessage,
  FormErrorMessage
} from "./project-form.styles"

// types
import { SubmitStatus } from "../admin-form/admin-form.component"
export type ProjectFormData = {
  project: {
    project_url?: string;
    title: string;
    role: string;
    client?: string;
    production_company?: string;
    agency?: string;
    thumbnail_url?: string;
    date: Date;
  }
}

// transform url into correct url and thumbnail url
// useNavigate should be called in useEffect not on its own
// display thumbnail above form
// display errors (need to add to admin form too)
// sort_order may need to be included or accounted for
// empty fields should be null instead of empty strings


// component
const ProjectForm = () => {
  // state
  const { admin } = useContext(AdminContext)
  const [ submitStatus, setSubmitStatus ] = useState<SubmitStatus | null>(null)

  // navigation
  const navigate = useNavigate();
  // redirect if not signed in 
  !admin && navigate('/')

  // destructure useForm elements & pass form data type
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ProjectFormData>()

   // ------------ ON SUBMIT HANDLER ---------------
  const onProjectFormSubmitHandler: SubmitHandler<ProjectFormData> = async (data) => {
    // format project url & thumbnail url
    const projectData = addThumbnailToProjectFormData(data)
    // backend call to create a project (projects#create)
    const response = await createProject(projectData)
    // destructure server response
    const { status: responseStatus } = response
    // if project created successfully update and reroute to new project
    if (responseStatus.code === 200 ) {
      const { id, title } = response.data.data.attributes
      const route = `/portfolio/${id}/${title.replace(/\s+/g, '-')}`
      alert('project created successfully')
      navigate(route)
      location.reload();

      // if errors set submit status and reset page
    } else if (responseStatus.errors) {
      setSubmitStatus({
        message: responseStatus.message,
        errors: responseStatus.errors
      }) 
      reset()
    }
  }

  // component elements
  return (
    <NewProjectContainer>
      <ProjectFormHeader>Enter Project Details</ProjectFormHeader>

      {/* display a success/failure message on form submit */}
      {submitStatus && submitStatus.errors && <FormErrorMessage>{submitStatus.message}</FormErrorMessage>}

      <ProjectFormContainer>
        <form onSubmit={ handleSubmit( onProjectFormSubmitHandler )}>
          <FormLabel htmlFor='project_url'>Project URL</FormLabel>
          <FormInput type='text' {...register('project.project_url')}/>

          {errors.project?.title && <FormErrorMessage>{errors.project.title.message}</FormErrorMessage>}
          <FormLabel htmlFor='title'>Title</FormLabel>
          <FormInput type='text' {...register('project.title', { required: 'Title is required'})}/>

          {errors.project?.role && <FormErrorMessage>{errors.project.role.message}</FormErrorMessage>}
          <FormLabel htmlFor='role'>Role</FormLabel>
          <FormInput type='text' {...register('project.role', { required: 'Role is required' })}/>

          <FormLabel htmlFor='client'>Client</FormLabel>
          <FormInput type='text' {...register('project.client')}/>

          <FormLabel htmlFor='production_company'>Production Company</FormLabel>
          <FormInput type='text' {...register('project.production_company')}/>

          <FormLabel htmlFor='agency'>Agency</FormLabel>
          <FormInput type='text' {...register('project.agency')}/>

          {errors.project?.date && <FormErrorMessage>{errors.project.date.message}</FormErrorMessage>}
          <FormLabel htmlFor='date'>Date</FormLabel>
          <FormInput type='date' {...register('project.date', { required: 'Date is required' })} />

          <ProjectFormSubmitButton>Submit</ProjectFormSubmitButton>
        </form>
      </ProjectFormContainer>
    </NewProjectContainer>
  )
}

export default ProjectForm