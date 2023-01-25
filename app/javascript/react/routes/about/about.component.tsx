import { Fragment } from "react"

import image from '../../../../assets/images/about.png'

import PageHeader from "../../components/page-header/page-header.component"
import Bio from "../../components/bio/bio.component"

import { PageContent } from "../../components/page-content/page-content.styles"
import { HeroImage } from "../../components/hero-image/hero-image.styles"

const About = () => {
  return (
    <Fragment>
      <PageHeader pageName='ABOUT'/>
      <PageContent>
        <HeroImage src={ image } />
        <Bio />
      </PageContent>
    </Fragment>
  )
}

export default About