import { Fragment, useContext } from 'react';
import { Outlet } from 'react-router-dom';

import { AdminContext } from '../../contexts/admin.context';
import { logoutCurrentAdmin } from '../../utils/backend_api';

import { 
  LogoContainer, 
  NavigationContainer, 
  NavigationLink, 
  NavigationLinks 
} from './navigation.styles';

const Navigation = () => {
  const { admin, setAdmin } = useContext(AdminContext)

  const handleLogOut = async () => {
    const response = await logoutCurrentAdmin()
    setAdmin(null)
  }

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <span>Rebecca Eddy Bacon | Producer</span>
        </LogoContainer>
        { admin && <button onClick={handleLogOut}>Log Out</button> }
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