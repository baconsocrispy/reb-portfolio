import styled from "styled-components";

export const BioContainer = styled.div`
  padding: 2%;
  color: var(--theme-font-color-primary);

  @media (min-width: 700px) {
    position: absolute;
    width: 30%;
    max-height: 60%;
    top: 20%;
    left: 30%;
    background-color: white;
    border-radius: 3%;
    overflow: scroll;
  }

`

export const BioHeader = styled.span`
  
`

export const BioContent = styled.p`
  font-size: 1em;
  font-family: var(--theme-font-family-primary);
`