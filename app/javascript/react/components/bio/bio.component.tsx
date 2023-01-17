import { bioContent } from "./bio.content"
import { BioContainer, BioContent, BioHeader } from "./bio.styles"

const Bio = () => {
  return (
    <BioContainer>
      <BioHeader>My Story</BioHeader>
      <BioContent>{ bioContent }</BioContent>
    </BioContainer>
  )
}

export default Bio