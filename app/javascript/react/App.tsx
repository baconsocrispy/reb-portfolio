import { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';
import ProjectPage from './routes/project-page/project-page.component';

import { GlobalStyle } from './global.styles';

const App = () => {
  return (
    <Fragment>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={ <Navigation /> }>
          <Route index element={ <Home /> }/>
          <Route path='portfolio/:project' element={ <ProjectPage /> }/>
        </Route>
      </Routes>
    </Fragment>
  )
}

export default App