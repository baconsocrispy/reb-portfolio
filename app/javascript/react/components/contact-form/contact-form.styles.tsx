import styled from "styled-components";

export const FormContainer = styled.div`

  padding: 5%;

  @media (min-width: 700px) {
    position: absolute;
    display: flex;
    width: 30%;
    height: 65%;
    right: 17%;
    top: 10%;
    padding: 2% 2%;
    background-color: white;
    border-radius: 5%;
    color: var(--theme-font-color-primary);

  form {
    width: 100%;
  }
  }
`

export const FormHeader = styled.span`
  display: block;
  margin-bottom: 10px;
  font-size: 1em;
`

export const FormLabel = styled.label`
  display: block;
`

export const FormInput = styled.input`
  display: block;
  width: 100%;
  margin-bottom: 10px;
`

export const FormMessage = styled.textarea`
  display: block;
  width: 100%;
  min-height: 40%;
  max-height: 50%;
  margin-bottom: 10px;
`

export const FormSubmitButton = styled.button`
  display: block;
  border: none;
  background-color: var(--theme-font-color-primary);
  color: white;
  border-radius: 5%;
  font-family: var(--theme-font-family-secondary);
  padding: 0% 2%;
  font-size: 1em;
  cursor: pointer;

  &:hover {
    border: 1px solid var(--theme-font-color-primary);
    background-color: white;
    color: var(--theme-font-color-primary);
  }
`

export const FormErrorMessage = styled.span`
  color: red;
  font-size: 0.75em;
`