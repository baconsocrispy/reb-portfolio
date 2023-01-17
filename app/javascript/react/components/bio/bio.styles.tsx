import styled from "styled-components";

export const BioContainer = styled.div`
  padding: 2%;
  color: var(--theme-font-color-primary);

  @media (min-width: 700px) {
    position: absolute;
    width: 40%;
    min-height: 65%;
    max-height: 80%;
    top: 10%;
    left: 20%;
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