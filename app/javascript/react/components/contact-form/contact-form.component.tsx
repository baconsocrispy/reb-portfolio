import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { sendContactMessage } from '../../utils/backend_api';

import { 
  FormContainer, 
  FormInput, 
  FormLabel, 
  FormSubmitButton, 
  FormMessage, 
  FormHeader,
  FormErrorMessage,
  SubmitSuccessMessage
} from "./contact-form.styles"

export type FormData = {
  name: string;
  email: string;
  message: string;
}

const ContactForm = () => {
  // track success/failure of form submission
  type SubmitStatus = {
    success: boolean;
    message: string;
  }

  const [ submitStatus, setSubmitStatus ] = useState<SubmitStatus | null>(null)
  const handleSubmitResponse = (response: Promise<SubmitStatus>) => {
    response.then((data) => setSubmitStatus(data))
  }

  // destructure useForm elements, passing FormData type.
  // register bundles up all form input values into data 
  // object passed to handlesubmit
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm<FormData>()

  // api call to backend to send form message
  // need to give it the SubmitHandler type from useForm and 
  // pass FormData type defined above
  const onFormSubmit: SubmitHandler<FormData> = (data) => {
    const response = sendContactMessage(data)
    handleSubmitResponse(response)
    reset();
  }

  return (
    <FormContainer>
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
    </FormContainer>
  )
}

export default ContactForm