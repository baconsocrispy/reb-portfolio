// external imports
import { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';

// route components
import Navigation from './routes/navigation/navigation.component';
import Portfolio from './routes/portfolio/portfolio.component';
import ProjectPage from './routes/project-page/project-page.component';
import About from './routes/about/about.component';
import Contact from './routes/contact/contact.component';
import Admin from './routes/admin/admin.component';
import NewProject from './routes/new-project/new-project.component';
import EditProject from './routes/edit-project/edit-project.component';
import NotFound from './routes/not-found/not-found.component';

// styles
import { GlobalStyle } from './global.styles';

const App = () => {
  return (
    <Fragment>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={ <Navigation /> }>
          <Route index element={ <Portfolio /> } />
          <Route path='/portfolio' element={ <Portfolio /> } />
          <Route path='/portfolio/:id/:title' element={ <ProjectPage /> } />
          <Route path='/about' element={ <About /> }/>
          <Route path='/contact' element={ <Contact />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/new-project' element={ <NewProject />} />
          <Route path='/portfolio/:id/edit-project' element={<EditProject />} />
          <Route path='*' element={ <NotFound /> } />
        </Route>
      </Routes>
    </Fragment>
  )
}

export default App