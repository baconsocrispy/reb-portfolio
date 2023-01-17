import { SubmitHandler, useForm } from 'react-hook-form';

import { sendContactMessage } from '../../utils/backend_api';

import { 
  FormContainer, 
  FormInput, 
  FormLabel, 
  FormSubmitButton, 
  FormMessage, 
  FormHeader,
  FormErrorMessage
} from "./contact-form.styles"

export type FormData = {
  email: string;
  message: string;
}

const ContactForm = () => {
  // destructure useForm elements, passing FormData type
  const { 
    register, 
    handleSubmit, 
    reset, 
    watch, 
    formState: { errors } 
  } = useForm<FormData>()

  // api call to rails backend to send form message
  // need to give it the SubmitHandler type from useForm and 
  // pass FormData type
  const onFormSubmit: SubmitHandler<FormData> = (data) => {
    console.log('start submit')
    sendContactMessage(data)
    reset();
    console.log(data)
  }

  return (
    <FormContainer>
      <form onSubmit={ handleSubmit(onFormSubmit) }>
        <FormHeader>SEND ME A MESSAGE</FormHeader>

        {errors.email && <FormErrorMessage>{ errors.email.message }</FormErrorMessage>}
        <FormLabel htmlFor="email">Email</FormLabel>
        <FormInput type='email' {...register('email', { required: 'Email address is required', pattern: /^\S+@\S+$/i})}/>
        
        {errors.message && <FormErrorMessage>{ errors.message.message }</FormErrorMessage>}
        <FormLabel htmlFor="message">Message</FormLabel>
        <FormMessage id='message' {...register('message', { required: 'Please add a message' })}/>

        <FormSubmitButton type="submit">Submit</FormSubmitButton>
      </form>
    </FormContainer>
  )
}

export default ContactForm