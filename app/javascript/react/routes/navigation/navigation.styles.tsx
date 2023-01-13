import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavigationContainer = styled.div`
  height: 3rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-family: var(--theme-font-family-secondary);
  font-weight: 700;
`

export const LogoContainer = styled(Link)`
  height: 100%;
  width: auto;
  display: flex;
  align-items: center;
  color: white;
  background-color: var(--theme-font-color-primary);
  padding: 0 2%;
`

export const NavigationLinks = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

export const NavigationLink = styled(Link)`
  height: 100%;
  display: flex;
  align-items: center;
  color: white;
  background-color: var(--theme-font-color-primary);
  padding: 0 2%;
  cursor: pointer;
`