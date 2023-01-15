import styled from "styled-components";

export const ProjectContainer = styled.div`
  width: 100%;
  margin: auto;

  @media (min-width: 700px) {
    max-width: 50%;
  }
`
// padding-bottom helps preserve 16:9 aspect ratio for video
export const ContentContainer = styled.div`
  position: relative;
  padding-bottom: 56.25%;
`

// absolutely positioing the video in the container allows 
// height and width to adjust responsively
export const Content = styled.iframe`
  position: absolute;
  width: 100%;
  height: 100%;
`

export const DetailsContainer = styled.div`
  width: 100%;
`
export const ProjectDetail = styled.span`
  width: 100%;
  display: block;
  font-weight: var(--theme-font-weight-light);;
  color: var(--theme-font-color-primary);
`