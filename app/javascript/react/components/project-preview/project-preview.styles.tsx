import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ProjectContainer = styled.div`
  position: relative;
  width: 80%;
  margin: auto;
  margin-top: 1em;

  &:hover {
    cursor: pointer;
  }

  @media (min-width: 700px) {
    min-width: 200px;
    max-width: 250px;
  }
`

export const ProjectThumbnail = styled.img`
  display: block;
  width: 100%;

  @media (min-width: 700px) {
    max-height: 140px;
    object-fit: cover;
  }
`

export const ProjectTitle = styled.span`
  display: block;
  width: 100%;
  font-weight: var(--theme-font-weight-bold);
  color: var(--theme-font-color-primary);
`

export const ActiveSwitch = styled(FontAwesomeIcon)`
  position: absolute;
  top: 1em;
  right: 1em;
  color: gold;
`

export const EditButton = styled(FontAwesomeIcon)`
  position: absolute;
  top: 1em;
  right: 3em;
  color: gold;
`