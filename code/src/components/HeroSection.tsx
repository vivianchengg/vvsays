import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Props {
  onArrowClick: () => void;
}

export const HeroSection = ({ onArrowClick }: Props) => {
  const isMobile = useMediaQuery('(max-width:700px)');

  return (
    <Box
      sx={{
        bgcolor: 'pink',
        height: isMobile ? 'calc(100vh - 84px)' : 'calc(100vh - 64px)',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
      mt={isMobile ? '84px' : '64px'}
      className="wave-bg"
    >
      <Box flex={'2'} sx={{ alignContent: 'center' }}>
        <Box>
          <svg width={isMobile ? '90%' : '50%'} height="25%" viewBox="0 0 500 150">
            <defs>
              <path
                id="arc"
                d="M 50 150 Q 250 20 450 150"
                fill="transparent"
              />
            </defs>
            <text
              fill="#4F3B30"
              fontSize="36"
              fontFamily="'Playfair Display', serif"
              fontWeight="900"
              fontStyle="italic"
            >
              <textPath href="#arc" startOffset="50%" textAnchor="middle">
                WELCOME TO MY PAGE
              </textPath>
            </text>
          </svg>
        </Box>
        <Box>
          <img
            src="/assets/memoji.gif"
            alt="Animated avatar"
            style={{
              width: isMobile ? '70%' : '30%',
              height: 'auto',
            }}
          />
        </Box>
      </Box>
      <Box display={'flex'} flex={'1'} alignContent={'center'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
        <Typography
          fontWeight={'bold'}
          color="#4F3B30"
          fontFamily={'karla'}
          fontSize={'22px'}
          mb={'10px'}
          width={'50%'}
        >
          Hi there! Wanna get to know more about me?
        </Typography>
        <Button onClick={onArrowClick}>
          <ExpandMoreIcon sx={{fontSize: '40px', color: '#4F3B30'}}/>
        </Button>
      </Box>
    </Box>
  );
};