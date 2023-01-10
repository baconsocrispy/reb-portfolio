import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavigationContainer = styled.div`
  height: 3rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  background-color: red;
`

export const LogoContainer = styled(Link)`
  height: 100%;
  width: auto;
  display: flex;
  align-items: center;
  color: white;
  background-color: blue;
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
  background-color: green;
  padding: 0 2%;
  cursor: pointer;
`