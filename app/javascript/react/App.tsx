import { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navigation from './routes/navigation/navigation.component';
import Portfolio from './routes/portfolio/portfolio.component';
import ProjectPage from './routes/project-page/project-page.component';
import About from './routes/about/about.component';
import Contact from './routes/contact/contact.component';

import { GlobalStyle } from './global.styles';

const App = () => {
  return (
    <Fragment>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={ <Navigation /> }>
          <Route index element={ <Portfolio /> }/>
          <Route path='portfolio' element={ <Portfolio />}/>
          <Route path='portfolio/:project' element={ <ProjectPage /> }/>
          <Route path='about' element={ <About /> }/>
          <Route path='contact' element={ <Contact />}/>
        </Route>
      </Routes>
    </Fragment>
  )
}

export default App