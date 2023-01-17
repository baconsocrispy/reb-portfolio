import styled from "styled-components";

export const ProjectsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  @media (min-width: 700px) {
    width: 95%;
    gap: 10px;
    margin: auto;
  }
`