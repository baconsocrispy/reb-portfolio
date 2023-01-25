import { Fragment } from "react"

import image from "../../../../assets/images/contact.png"

import ContactForm from "../../components/contact-form/contact-form.component"
import PageHeader from "../../components/page-header/page-header.component"

import { HeroImage } from "../../components/hero-image/hero-image.styles"
import { PageContent } from "../../components/page-content/page-content.styles"

const Contact = () => {
  return (
    <Fragment>
      <PageHeader pageName='CONTACT' />
      <PageContent>
        <ContactForm />
        <HeroImage src={ image } />
      </PageContent>
    </Fragment>
  )
}

export default Contact