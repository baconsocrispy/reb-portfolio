import styled from "styled-components";

export const ProjectContainer = styled.div`
  width: 100%;
  margin-top: 1em;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    cursor: pointer;
  }

  @media (min-width: 700px) {
    min-width: 200px;
    max-width: 250px;
  }
`

export const ProjectThumbnail = styled.img`
  width: 100%;

  @media (min-width: 700px) {
    max-height: 140px;
    object-fit: cover;
  }
`

export const ProjectTitle = styled.span`
  width: 100%;
  font-weight: var(--theme-font-weight-bold);
  color: var(--theme-font-color-primary);
`
export const ProjectRole = styled.span`
  width: 100%;
  font-weight: var(--theme-font-weight-light);;
  color: var(--theme-font-color-primary);
`