import { FC } from 'react';

import { PageHeaderContainer, Header } from "./page-header.styles"


type PageHeaderProps = {
  pageName: string
}

const PageHeader:FC<PageHeaderProps> = ({ pageName }) => {
  return (
    <PageHeaderContainer>
      <Header>
        { pageName }
      </Header>
    </PageHeaderContainer>
  )
}

export default PageHeader