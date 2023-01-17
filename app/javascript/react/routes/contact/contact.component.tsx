import { Fragment } from "react"

import image from "../../../../assets/images/on_set.png"
import ContactForm from "../../components/contact-form/contact-form.component"
import PageHeader from "../../components/page-header/page-header.component"
import { HeroContainer, HeroImage } from "./contact.styles"

const Contact = () => {
  return (
    <Fragment>
      <PageHeader pageName='CONTACT' />
      <HeroContainer>
        <ContactForm />
        <HeroImage src={ image } />
      </HeroContainer>
    </Fragment>
  )
}

export default Contact