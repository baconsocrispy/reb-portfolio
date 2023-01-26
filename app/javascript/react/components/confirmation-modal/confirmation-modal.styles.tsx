import styled from "styled-components";

export const ModalMessage = styled.p`
  width: 100%;
`

export const ModalButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`

export const ModalButton = styled.button`
  cursor: pointer;
  background: none;
  color: var(--theme-font-color-primary);
  border: 1px solid var(--theme-font-color-primary);
  font-family: var(--theme-font-family-secondary);
  font-size: 1em;
  white-space: nowrap;

  &:hover {
    background-color: var(--theme-font-color-primary);
    color: white;
  }
`