// external imports
import { Fragment, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
// internal imports
import { AdminContext } from '../../contexts/admin.context';
import { logoutCurrentAdmin } from '../../utils/backend_api';
// styles
import { 
  LogoContainer, 
  NavigationContainer, 
  NavigationLink, 
  NavigationLinks,
  NavButton,
  Logo
} from './navigation.styles';

// component
const Navigation = () => {
  // state
  const { admin, setAdmin } = useContext(AdminContext)
  const navigate = useNavigate()

  // onClick handlers
  const handleLogOut = async () => {
    const response = await logoutCurrentAdmin()
    setAdmin(null)
    navigate('/')
    location.reload()
  }

  const handleLogIn = () => navigate('/admin')

  // component elements
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <Logo>Rebecca Eddy Bacon | Producer</Logo>
        </LogoContainer>
        {admin &&
          <NavigationLink to='new-project'>
            <NavButton>
              New Project
            </NavButton>
          </NavigationLink>
        }
        <NavigationLinks>
          <NavigationLink to='/'>Portfolio</NavigationLink>
          <NavigationLink to='about'>About</NavigationLink>
          <NavigationLink to='contact'>Contact</NavigationLink>
          { admin && 
            <NavButton onClick={ handleLogOut }>
              Log Out
            </NavButton>
          }  
        </NavigationLinks>
      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
}

export default Navigation