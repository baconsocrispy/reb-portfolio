import { Fragment } from "react"

import image from "../../../../assets/images/on_set.png"
import PageHeader from "../../components/page-header/page-header.component"
import { ContactDetailsContainer, HeroContainer, HeroImage } from "./contact.styles"

const Contact = () => {
  return (
    <Fragment>
      
      <HeroContainer>
        <PageHeader pageName='CONTACT' />
        <HeroImage src={ image } />
      </HeroContainer>
    </Fragment>
  )
}

export default Contact