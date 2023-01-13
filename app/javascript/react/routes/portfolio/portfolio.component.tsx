import { Fragment } from "react"
import PageHeader from "../../components/page-header/page-header.component"
import ProjectIndex from "../../components/project-index/project-index.component"

const Portfolio = () => {
  return (
    <Fragment>
      <PageHeader pageName='PORTFOLIO' />
      <ProjectIndex />
    </Fragment>
   
  )
}

export default Portfolio