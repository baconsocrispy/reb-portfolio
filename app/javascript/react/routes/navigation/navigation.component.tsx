import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

import { LogoContainer, NavigationContainer, NavigationLink, NavigationLinks } from './navigation.styles';

const Navigation = () => {
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <span>Rebecca Eddy Bacon</span>
        </LogoContainer>
        <NavigationLinks>
          <NavigationLink to='/'>Portfolio</NavigationLink>
          <NavigationLink to='/'>Contact</NavigationLink>
        </NavigationLinks>  
      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
}

export default Navigation