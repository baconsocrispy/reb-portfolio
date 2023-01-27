// internal imports
import LinkedInLogo from '../../../../assets/images/linkedin.png';

// styles
import { 
  SocialLinksContainer, 
  SocialLinksMessage, 
  SocialLogo, 
  SocialLogoContainer 
} from "./social-links.styles"

// component
const SocialLinks = () => {
  const LinkedInLink = 'https://www.linkedin.com/in/rebecca-eddy-bacon-41bb2b168/'

  // component elements
  return (
    <SocialLinksContainer>
      <SocialLinksMessage>
        Or find me on LinkedIn:&nbsp;
      </SocialLinksMessage>
      <SocialLogoContainer href={ LinkedInLink }>
        <SocialLogo src={ LinkedInLogo } />
      </SocialLogoContainer>
    </SocialLinksContainer>
  )
}

export default SocialLinks