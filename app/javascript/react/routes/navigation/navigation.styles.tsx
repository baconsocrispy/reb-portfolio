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

  @media (min-width: 389px) {
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