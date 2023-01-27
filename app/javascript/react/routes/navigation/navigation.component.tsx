// external imports
import { Fragment, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
// internal imports
import { AdminContext } from '../../contexts/admin.context';

// styles
import { 
  LogoContainer, 
  NavigationContainer, 
  NavigationLink, 
  NavigationLinks,
  Logo
} from './navigation.styles';

// component
const Navigation = () => {
  // state
  const { admin, setAdmin } = useContext(AdminContext)
  const navigate = useNavigate()

  // component elements
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <Logo>Rebecca Eddy Bacon | Producer</Logo>
        </LogoContainer>
        <NavigationLinks>
          <NavigationLink to='/'>Portfolio</NavigationLink>
          <NavigationLink to='about'>About</NavigationLink>
          <NavigationLink to='contact'>Contact</NavigationLink>
        </NavigationLinks>
      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
}

export default Navigation