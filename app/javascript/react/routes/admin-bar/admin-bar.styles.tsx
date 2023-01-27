import styled from "styled-components";
import { Link } from "react-router-dom";

export const AdminBarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2%;
`

export const AdminLink = styled(Link)`
  height: 100%;
  color: var(--theme-font-color-primary);
  padding: 0 2%;
  cursor: pointer;
`

export const AdminButton = styled.button` 
  cursor: pointer;
  background: none;
  color: var(--theme-font-color-primary);
  border: 1px solid var(--theme-font-color-primary);
  font-family: var(--theme-font-family-secondary);
  font-size: .75em;
  white-space: nowrap; // prevents button text from wrapping

  &:hover {
    background-color: var(--theme-font-color-primary);
    color: white;
  }
`