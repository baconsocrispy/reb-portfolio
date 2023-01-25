import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavigationContainer = styled.div`
  height: 3rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-family: var(--theme-font-family-secondary);
  font-weight: 700;
  font-size: .75em;

  @media (min-width: 700px) {
    font-size: 1em;
  }
`

export const LogoContainer = styled(Link)`
  height: 100%;
  width: auto;
  display: flex;
  align-items: center;
  color: var(--theme-font-color-primary);
  padding: 0 2%;
`

export const Logo = styled.span`
  white-space: nowrap;
`

export const NavigationLinks = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 2%;
`

export const NavigationLink = styled(Link)`
  height: 100%;
  display: flex;
  align-items: center;
  color: var(--theme-font-color-primary);
  padding: 0 2%;
  cursor: pointer;
`

export const NavButton = styled.button` 
  cursor: pointer;
  background: none;
  color: var(--theme-font-color-primary);
  border: 1px solid var(--theme-font-color-primary);
  font-family: var(--theme-font-family-secondary);
  font-size: .75em;
  white-space: nowrap;

  &:hover {
    background-color: var(--theme-font-color-primary);
    color: white;
  }
`