import styled from "styled-components";
import { FormSubmitButton } from "../contact-form/contact-form.styles";

export const NewProjectContainer = styled.div`
  width: 50%;
  margin: auto;
  text-align: center;
  font-family: var(--theme-font-family-secondary);
  color: var(--theme-font-color-primary);
`

export const ProjectFormHeader = styled.h1`
  
`

export const ProjectFormContainer = styled.div`
  
`

export const ProjectFormSubmitButton = styled(FormSubmitButton)`
  margin: auto;
  margin-top: 1em;
`

export const FormErrorMessage = styled.span`
  color: red;
  font-size: 0.75em;
`

export const SubmitSuccessMessage = styled.span`
  color: seagreen;
  font-size: 0.75em;
`