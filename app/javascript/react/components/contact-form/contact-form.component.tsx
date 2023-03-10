// external imports
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

// internal imports
import SocialLinks from '../social-links/social-links.component';

// api
import { sendContactMessage } from '../../utils/backend-api';

// styles
import { 
  FormContainer, 
  FormInput, 
  FormLabel, 
  FormSubmitButton, 
  FormMessage, 
  FormHeader,
  FormErrorMessage,
  SubmitSuccessMessage,
  FormWrapper
} from "./contact-form.styles"

// types
export type ContactFormData = {
  name: string;
  email: string;
  message: string;
}

type SubmitStatus = {
  success: boolean;
  message: string;
}

// component
const ContactForm = () => {
  // state
  const [ submitStatus, setSubmitStatus ] = useState<SubmitStatus | null>(null)

  // destructure useForm elements & pass form data type
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm<ContactFormData>()

  // ------------ ON SUBMIT HANDLER ---------------
  const onFormSubmit: SubmitHandler<ContactFormData> = (data) => {
    const response = sendContactMessage(data)
    handleSubmitResponse(response)
    reset();
  }

  const handleSubmitResponse = (response: Promise<SubmitStatus>) => {
    response.then((data) => setSubmitStatus(data))
  }

  return (
    <FormContainer>
      <FormWrapper>
      {/* handleSubmit passes form data from register to the onFormSubmit callback */}
        <form onSubmit={ handleSubmit(onFormSubmit) }>
          <FormHeader>SEND ME A MESSAGE</FormHeader>

          {/* display a success/failure message on form submit */}
          {submitStatus && submitStatus.success && <SubmitSuccessMessage>{ submitStatus.message }</SubmitSuccessMessage> }
          {submitStatus && !submitStatus.success && <FormErrorMessage>{ submitStatus.message }</FormErrorMessage>}

          {/* name input */}
          {errors.name && <FormErrorMessage>{ errors.name.message }</FormErrorMessage>}
          <FormLabel htmlFor="name">Name</FormLabel>
          <FormInput type='text' {...register('name', { required: 'Please let me know your name'})} />

          {/* email input */}
          {errors.email && <FormErrorMessage>{ errors.email.message }</FormErrorMessage>}
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormInput type='email' {...register('email', { required: 'Email address is required', pattern: /^\S+@\S+$/i})}/>
          
          {/* message input */}
          {errors.message && <FormErrorMessage>{ errors.message.message }</FormErrorMessage>}
          <FormLabel htmlFor="message">Message</FormLabel>
          <FormMessage id='message' {...register('message', { required: 'Please add a message' })}/>

          <FormSubmitButton type="submit">Submit</FormSubmitButton>
        </form>
        <SocialLinks />
      </FormWrapper>
    </FormContainer>
  )
}

export default ContactForm