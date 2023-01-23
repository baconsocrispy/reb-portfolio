// external imports
import { FC, useContext, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

// internal imports
import { AdminContext } from "../../contexts/admin.context";
import { createAdmin, getCurrentAdmin, loginAdmin } from "../../utils/backend_api";
import { FormErrorMessage } from "../contact-form/contact-form.styles";

// styles
import { 
  AdminContainer, 
  AdminHeader,
  AdminFormContainer,
  AdminFormLabel,
  AdminFormInput,
  AdminFormSubmitButton
} from "./admin-form.styles";

// types
export enum FORM_TYPES {
  SIGNUP = 'Sign Up',
  SIGNIN = 'Sign In',
}

export type AdminFormData = {
  admin: {
    email: string;
    password: string;
    username?: string;
    password_confirmation?: string
  }  
}

export type SubmitStatus = {
  code?: number;
  message?: string;
  errors?: Object;
}

export type AdminFormProps = {
  formType: string;
}

// component
const AdminForm: FC<AdminFormProps> = ({ formType }) => {
  // state
  const { setAdmin } = useContext(AdminContext)
  const [ submitStatus, setSubmitStatus] = useState<SubmitStatus>({});

  // navigation
  const navigate = useNavigate()

  // destructure useForm elements
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<AdminFormData>()


  // ------------ ON SUBMIT HANDLERS ---------------
  const onSignUpSubmit: SubmitHandler<AdminFormData> = async (data: AdminFormData) => {
    // backend call to create admin
    const response = await createAdmin(data)
    // destructure server response
    const { status: responseStatus } = response
    // if there are errors, update submit status and reset fields
    if (responseStatus.errors) {
      setSubmitStatus({
        message: responseStatus.message,
        errors: responseStatus.errors
      })
      reset()
    // if admin successfully created, set current admin
    } else if (responseStatus.code === 200) {
      const adminResponse = await getCurrentAdmin()
      const { data: adminData } = adminResponse
      setAdmin(adminData)
      // navigate to homepage
      navigate('/')
    }
  }

  const onLogInSubmit: SubmitHandler<AdminFormData> = async (data: AdminFormData) => {
    // log admin in
    const response = await loginAdmin(data)
    const { status: responseStatus } = response
    // if there are errors, update submit status and reset fields
    if (responseStatus.errors) {
      setSubmitStatus({
        message: responseStatus.message,
        errors: responseStatus.errors
      })
      reset()
    // if logged in successfully, set current admin
    } else if (responseStatus.code === 200) {
      // set current admin
      const adminResponse = await getCurrentAdmin()
      const { data: adminData } = adminResponse
      setAdmin(adminData)
      // navigate to homepage
      navigate('/')
    }
  }

  return (
    <AdminContainer>
      <AdminHeader>Admin { formType }</AdminHeader>

      {/* form submission error messages */}
      { submitStatus.errors && 
        <FormErrorMessage>{ submitStatus.message }</FormErrorMessage>
      }

      <AdminFormContainer>
        <form id='admin' onSubmit={ formType === FORM_TYPES.SIGNUP ? 
          handleSubmit(onSignUpSubmit) :
          handleSubmit(onLogInSubmit)}
        >         
          {/* username (signup only) */}
          { formType === FORM_TYPES.SIGNUP &&
            <Fragment>
              <AdminFormLabel htmlFor="username">Username</AdminFormLabel>
              <AdminFormInput type='text' {...register('admin.username', { required: 'Please enter a username' })} />
            </Fragment>
          }

          {/* email */}
          <AdminFormLabel htmlFor="email">Email</AdminFormLabel>
          <AdminFormInput type='email'{...register('admin.email', { required: 'Email is required' })} />

          {/* password */}
          <AdminFormLabel htmlFor="password">Password</AdminFormLabel>
          <AdminFormInput type='password' {...register('admin.password', { required: 'Please enter a password' })} />

          {/* password confirmation (signup only) */}
          { formType === FORM_TYPES.SIGNUP &&
            <Fragment>
              <AdminFormLabel htmlFor="password_confirmation">Confirm Password</AdminFormLabel>
              <AdminFormInput type='password' {...register('admin.password_confirmation', { required: 'Password confirmation required' })} />
            </Fragment> 
          }

          {/* submit button */}
          <AdminFormSubmitButton>Submit</AdminFormSubmitButton>
        </form>
      </AdminFormContainer>
    </AdminContainer>
  )
}

export default AdminForm

