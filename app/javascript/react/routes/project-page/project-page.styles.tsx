import styled from "styled-components";

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`

export const EditProjectButton = styled.button`
  cursor: pointer;
  background-color:var(--theme-font-color-primary);
  color: white;
  border: 1px solid var(--theme-font-color-primary);
  font-family: var(--theme-font-family-secondary);
  border-radius: 5%;
  margin-top: 2em;

  &:hover {
    background: none;
    color: red;
    border: 1px solid red;
  }
`

export const DeleteProjectButton = styled.button`
  cursor: pointer;
  background-color: red;
  color: white;
  border: 1px solid red;
  font-family: var(--theme-font-family-secondary);
  border-radius: 5%;
  margin-top: 2em;

  &:hover {
    background: none;
    color: red;
    border: 1px solid red;
  }
`