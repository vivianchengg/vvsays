import { Box, useMediaQuery } from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

interface Props {
  contactType: string;
  top?: string;
  left?: string;
  animationDelay?: string;
}

export const ContactBubble = ({ contactType, top, left, animationDelay}: Props) => {
  const isMobile = useMediaQuery('(max-width:700px)');
  const size = isMobile ? Math.random() * (150 - 100) + 100 : Math.random() * (300 - 150) + 150;

  const iconStyle = {
    color: '#4F3B30',
    fontSize: `${size * 0.4}px`,
  }

  const getLink = () => {
    if (contactType == 'linkedin') {
      return 'https://www.linkedin.com/in/vivianchengyy/';
    } else if(contactType == 'github') {
      return 'https://github.com/vivianchengg';
    }
  };

  const getIcon = () => {
    if (contactType == 'linkedin') {
      return <LinkedInIcon sx={iconStyle}/>;
    } else if(contactType == 'github') {
      return <GitHubIcon sx={iconStyle}/>;
    }
  };

  return (
    <Box
      component="a"
      href={getLink()}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        position: 'absolute',
        top,
        left,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        bgcolor: '#FCF8ED',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'float 4s ease-in-out infinite',
        animationDelay,
        textDecoration: 'none',
      }}
    >
      {getIcon()}
    </Box>
  );
};