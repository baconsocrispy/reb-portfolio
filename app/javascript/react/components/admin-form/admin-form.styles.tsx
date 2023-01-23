import styled from "styled-components";

import { FormSubmitButton } from "../contact-form/contact-form.styles";

export const AdminContainer = styled.div`
  text-align: center;
  padding: 2%;
`

export const AdminHeader = styled.h1`
  width: 100%;
  font-family: var(--theme-font-family-secondary);
  color: var(--theme-font-color-primary);
  text-align: center;
`

export const AdminFormContainer = styled.div`
  width: 100%;
`

export const AdminFormLabel = styled.label`
  display: block;
  margin-top: 1em;
`

export const AdminFormInput = styled.input`
  display: block;
  margin: auto;
  margin-top: 1em;
  width: 75%;
`

export const AdminFormSubmitButton = styled(FormSubmitButton)`
  margin: auto;
  margin-top: 1em;
`