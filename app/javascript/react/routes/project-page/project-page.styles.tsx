import styled from "styled-components";

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`

export const DeleteProjectButton = styled.button`
  cursor: pointer;
  background-color: red;
  color: white;
  border: none;
  font-family: var(--theme-font-family-secondary);
  border-radius: 5%;
  margin-top: 2em;

  &:hover {
    background: none;
    color: red;
    border: 1px solid red;
  }
`